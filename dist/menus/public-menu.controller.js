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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicMenuController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const menus_service_1 = require("./menus.service");
const prisma_service_1 = require("../prisma/prisma.service");
let PublicMenuController = class PublicMenuController {
    constructor(menusService, prisma) {
        this.menusService = menusService;
        this.prisma = prisma;
    }
    async getPublicMenu(restaurantId, language) {
        const subscription = await this.prisma.subscription.findUnique({
            where: { restaurantId },
        });
        if (!subscription) {
            throw new common_1.ForbiddenException('Restaurant subscription not found');
        }
        if (subscription.status !== 'ACTIVE') {
            throw new common_1.ForbiddenException('This restaurant menu is currently unavailable. Please contact the restaurant owner.');
        }
        if (subscription.currentPeriodEnd &&
            new Date() > subscription.currentPeriodEnd) {
            throw new common_1.ForbiddenException({
                message: 'انتهت مدة الاشتراك. المنيو غير متاح حالياً.',
                code: 'SUBSCRIPTION_EXPIRED',
                expiredAt: subscription.currentPeriodEnd,
            });
        }
        return this.menusService.getPublicMenu(restaurantId, language || 'en');
    }
};
exports.PublicMenuController = PublicMenuController;
__decorate([
    (0, common_1.Get)('restaurant/:restaurantId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get public menu (for QR codes)' }),
    __param(0, (0, common_1.Param)('restaurantId')),
    __param(1, (0, common_1.Query)('lang')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PublicMenuController.prototype, "getPublicMenu", null);
exports.PublicMenuController = PublicMenuController = __decorate([
    (0, swagger_1.ApiTags)('Public Menu'),
    (0, common_1.Controller)('public/menus'),
    __metadata("design:paramtypes", [menus_service_1.MenusService,
        prisma_service_1.PrismaService])
], PublicMenuController);
//# sourceMappingURL=public-menu.controller.js.map