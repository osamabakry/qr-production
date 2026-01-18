"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const stripe_1 = require("stripe");
let SubscriptionsService = class SubscriptionsService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.stripe = new stripe_1.default(this.configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2023-10-16',
        });
    }
    async getSubscription(restaurantId) {
        const subscription = await this.prisma.subscription.findUnique({
            where: { restaurantId },
            include: {
                restaurant: true,
            },
        });
        if (!subscription) {
            throw new common_1.NotFoundException('Subscription not found');
        }
        return subscription;
    }
    async createCheckoutSession(restaurantId, plan) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id: restaurantId },
            include: {
                subscription: true,
                owner: {
                    select: {
                        phone: true,
                    },
                },
            },
        });
        if (!restaurant) {
            throw new common_1.NotFoundException('Restaurant not found');
        }
        let customerId = restaurant.subscription?.stripeCustomerId;
        if (!customerId) {
            const customer = await this.stripe.customers.create({
                email: restaurant.email || `${restaurant.owner.phone}@restaurant.local`,
                metadata: {
                    restaurantId,
                },
            });
            customerId = customer.id;
        }
        const priceId = this.getPriceIdForPlan(plan);
        const session = await this.stripe.checkout.sessions.create({
            customer: customerId,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${this.configService.get('FRONTEND_URL')}/dashboard/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${this.configService.get('FRONTEND_URL')}/dashboard/subscription`,
            metadata: {
                restaurantId,
                plan,
            },
        });
        return { sessionId: session.id, url: session.url };
    }
    async handleWebhook(payload, signature) {
        const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        }
        catch (err) {
            throw new common_1.BadRequestException(`Webhook signature verification failed: ${err.message}`);
        }
        switch (event.type) {
            case 'checkout.session.completed':
                await this.handleCheckoutCompleted(event.data.object);
                break;
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
                await this.handleSubscriptionChange(event.data.object);
                break;
        }
        return { received: true };
    }
    async handleCheckoutCompleted(session) {
        const restaurantId = session.metadata?.restaurantId;
        const plan = session.metadata?.plan;
        if (!restaurantId) {
            return;
        }
        const subscription = await this.stripe.subscriptions.retrieve(session.subscription);
        await this.prisma.subscription.upsert({
            where: { restaurantId },
            create: {
                restaurantId,
                plan,
                status: this.mapStripeStatus(subscription.status),
                stripeCustomerId: subscription.customer,
                stripeSubscriptionId: subscription.id,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
            update: {
                plan,
                status: this.mapStripeStatus(subscription.status),
                stripeCustomerId: subscription.customer,
                stripeSubscriptionId: subscription.id,
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
        });
    }
    async handleSubscriptionChange(subscription) {
        const restaurant = await this.prisma.restaurant.findFirst({
            where: {
                subscription: {
                    stripeSubscriptionId: subscription.id,
                },
            },
        });
        if (!restaurant) {
            return;
        }
        await this.prisma.subscription.update({
            where: { restaurantId: restaurant.id },
            data: {
                status: this.mapStripeStatus(subscription.status),
                currentPeriodStart: new Date(subscription.current_period_start * 1000),
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                cancelAtPeriodEnd: subscription.cancel_at_period_end,
            },
        });
    }
    mapStripeStatus(status) {
        const statusMap = {
            active: 'ACTIVE',
            trialing: 'TRIALING',
            past_due: 'PAST_DUE',
            canceled: 'CANCELLED',
            unpaid: 'CANCELLED',
        };
        return statusMap[status] || 'ACTIVE';
    }
    getPriceIdForPlan(plan) {
        const priceMap = {
            PRO: this.configService.get('STRIPE_PRICE_ID_PRO') || '',
            ENTERPRISE: this.configService.get('STRIPE_PRICE_ID_ENTERPRISE') || '',
        };
        return priceMap[plan] || '';
    }
    async cancelSubscription(restaurantId) {
        const subscription = await this.prisma.subscription.findUnique({
            where: { restaurantId },
        });
        if (!subscription || !subscription.stripeSubscriptionId) {
            throw new common_1.NotFoundException('Subscription not found');
        }
        await this.stripe.subscriptions.update(subscription.stripeSubscriptionId, {
            cancel_at_period_end: true,
        });
        return this.prisma.subscription.update({
            where: { restaurantId },
            data: {
                cancelAtPeriodEnd: true,
            },
        });
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map