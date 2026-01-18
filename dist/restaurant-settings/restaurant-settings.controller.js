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
exports.RestaurantSettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const restaurant_settings_service_1 = require("./restaurant-settings.service");
const settings_dto_1 = require("./dto/settings.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const tenant_guard_1 = require("../common/guards/tenant.guard");
let RestaurantSettingsController = class RestaurantSettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    async get(restaurantId) {
        return this.settingsService.get(restaurantId);
    }
    async update(restaurantId, dto) {
        return this.settingsService.update(restaurantId, dto);
    }
};
exports.RestaurantSettingsController = RestaurantSettingsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get restaurant settings' }),
    __param(0, (0, common_1.Param)('restaurantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RestaurantSettingsController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update restaurant settings' }),
    __param(0, (0, common_1.Param)('restaurantId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, settings_dto_1.UpdateRestaurantSettingsDto]),
    __metadata("design:returntype", Promise)
], RestaurantSettingsController.prototype, "update", null);
exports.RestaurantSettingsController = RestaurantSettingsController = __decorate([
    (0, swagger_1.ApiTags)('Restaurant Settings'),
    (0, common_1.Controller)('restaurants/:restaurantId/settings'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, tenant_guard_1.TenantGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [restaurant_settings_service_1.RestaurantSettingsService])
], RestaurantSettingsController);
//# sourceMappingURL=restaurant-settings.controller.js.map