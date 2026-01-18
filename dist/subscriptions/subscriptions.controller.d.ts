import { SubscriptionsService } from './subscriptions.service';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    getSubscription(restaurantId: string): Promise<{
        restaurant: {
            phone: string | null;
            name: string;
            description: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            logo: string | null;
            coverImage: string | null;
            email: string | null;
            website: string | null;
            address: string | null;
            city: string | null;
            country: string | null;
            timezone: string;
            currency: string;
            taxRate: number;
            ownerId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        plan: import(".prisma/client").$Enums.SubscriptionPlan;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        stripeCustomerId: string | null;
        stripeSubscriptionId: string | null;
        currentPeriodStart: Date | null;
        currentPeriodEnd: Date | null;
        cancelAtPeriodEnd: boolean;
        restaurantId: string;
    }>;
    createCheckoutSession(restaurantId: string, plan: string): Promise<{
        sessionId: string;
        url: string;
    }>;
    cancelSubscription(restaurantId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        plan: import(".prisma/client").$Enums.SubscriptionPlan;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        stripeCustomerId: string | null;
        stripeSubscriptionId: string | null;
        currentPeriodStart: Date | null;
        currentPeriodEnd: Date | null;
        cancelAtPeriodEnd: boolean;
        restaurantId: string;
    }>;
}
