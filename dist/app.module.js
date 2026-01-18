"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const restaurants_module_1 = require("./restaurants/restaurants.module");
const menus_module_1 = require("./menus/menus.module");
const qr_codes_module_1 = require("./qr-codes/qr-codes.module");
const subscriptions_module_1 = require("./subscriptions/subscriptions.module");
const analytics_module_1 = require("./analytics/analytics.module");
const storage_module_1 = require("./storage/storage.module");
const branches_module_1 = require("./branches/branches.module");
const staff_module_1 = require("./staff/staff.module");
const restaurant_settings_module_1 = require("./restaurant-settings/restaurant-settings.module");
const admin_module_1 = require("./admin/admin.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            restaurants_module_1.RestaurantsModule,
            menus_module_1.MenusModule,
            qr_codes_module_1.QrCodesModule,
            subscriptions_module_1.SubscriptionsModule,
            analytics_module_1.AnalyticsModule,
            storage_module_1.StorageModule,
            branches_module_1.BranchesModule,
            staff_module_1.StaffModule,
            restaurant_settings_module_1.RestaurantSettingsModule,
            admin_module_1.AdminModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map