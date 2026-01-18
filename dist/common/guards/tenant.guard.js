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
exports.TenantGuard = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TenantGuard = class TenantGuard {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new common_1.ForbiddenException('User not authenticated');
        }
        const restaurantId = request.params?.restaurantId ||
            request.query?.restaurantId ||
            request.body?.restaurantId;
        if (!restaurantId) {
            throw new common_1.ForbiddenException('Restaurant ID is required');
        }
        const hasAccess = await this.checkRestaurantAccess(user.id, restaurantId, user.role);
        if (!hasAccess) {
            throw new common_1.ForbiddenException('Access denied to this restaurant');
        }
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id: restaurantId },
        });
        if (!restaurant) {
            throw new common_1.ForbiddenException('Restaurant not found');
        }
        request.tenant = restaurant;
        return true;
    }
    async checkRestaurantAccess(userId, restaurantId, userRole) {
        if (userRole === 'SUPER_ADMIN') {
            return true;
        }
        const restaurant = await this.prisma.restaurant.findFirst({
            where: {
                id: restaurantId,
                ownerId: userId,
            },
        });
        if (restaurant) {
            return true;
        }
        const staffRole = await this.prisma.staffRole.findUnique({
            where: {
                restaurantId_userId: {
                    restaurantId,
                    userId,
                },
            },
        });
        return !!staffRole;
    }
};
exports.TenantGuard = TenantGuard;
exports.TenantGuard = TenantGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TenantGuard);
//# sourceMappingURL=tenant.guard.js.map