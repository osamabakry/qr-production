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
exports.RestaurantSettingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RestaurantSettingsService = class RestaurantSettingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async get(restaurantId) {
        const settings = await this.prisma.restaurantSettings.findUnique({
            where: { restaurantId },
        });
        if (!settings) {
            return this.prisma.restaurantSettings.create({
                data: {
                    restaurantId,
                    languages: ['en'],
                    defaultLanguage: 'en',
                },
            });
        }
        return settings;
    }
    async update(restaurantId, dto) {
        return this.prisma.restaurantSettings.upsert({
            where: { restaurantId },
            create: {
                restaurantId,
                ...dto,
            },
            update: dto,
        });
    }
};
exports.RestaurantSettingsService = RestaurantSettingsService;
exports.RestaurantSettingsService = RestaurantSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RestaurantSettingsService);
//# sourceMappingURL=restaurant-settings.service.js.map