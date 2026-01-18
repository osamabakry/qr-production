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
exports.MenusService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MenusService = class MenusService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCategory(restaurantId, dto) {
        const maxOrder = await this.prisma.category.findFirst({
            where: { restaurantId },
            orderBy: { displayOrder: 'desc' },
            select: { displayOrder: true },
        });
        return this.prisma.category.create({
            data: {
                ...dto,
                restaurantId,
                displayOrder: (maxOrder?.displayOrder || 0) + 1,
            },
        });
    }
    async getCategories(restaurantId) {
        return this.prisma.category.findMany({
            where: { restaurantId, isActive: true },
            include: {
                _count: {
                    select: { items: true },
                },
            },
            orderBy: { displayOrder: 'asc' },
        });
    }
    async getCategory(id, restaurantId) {
        const category = await this.prisma.category.findFirst({
            where: { id, restaurantId },
            include: {
                items: {
                    where: { isAvailable: true },
                    orderBy: { displayOrder: 'asc' },
                },
            },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async updateCategory(id, restaurantId, dto) {
        return this.prisma.category.update({
            where: { id },
            data: dto,
        });
    }
    async deleteCategory(id, restaurantId) {
        return this.prisma.category.delete({
            where: { id },
        });
    }
    async createMenuItem(restaurantId, dto) {
        const category = await this.prisma.category.findFirst({
            where: { id: dto.categoryId, restaurantId },
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        const maxOrder = await this.prisma.menuItem.findFirst({
            where: { categoryId: dto.categoryId },
            orderBy: { displayOrder: 'desc' },
            select: { displayOrder: true },
        });
        return this.prisma.menuItem.create({
            data: {
                ...dto,
                restaurantId,
                displayOrder: (maxOrder?.displayOrder || 0) + 1,
            },
        });
    }
    async getMenuItems(restaurantId, categoryId) {
        const where = { restaurantId, isAvailable: true };
        if (categoryId) {
            where.categoryId = categoryId;
        }
        return this.prisma.menuItem.findMany({
            where,
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        nameTranslations: true,
                    },
                },
            },
            orderBy: [
                { category: { displayOrder: 'asc' } },
                { displayOrder: 'asc' },
            ],
        });
    }
    async getMenuItem(id, restaurantId) {
        const item = await this.prisma.menuItem.findFirst({
            where: { id, restaurantId },
            include: {
                category: true,
            },
        });
        if (!item) {
            throw new common_1.NotFoundException('Menu item not found');
        }
        return item;
    }
    async updateMenuItem(id, restaurantId, dto) {
        return this.prisma.menuItem.update({
            where: { id },
            data: dto,
        });
    }
    async deleteMenuItem(id, restaurantId) {
        return this.prisma.menuItem.delete({
            where: { id },
        });
    }
    async getPublicMenu(restaurantId, language = 'en') {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id: restaurantId },
            include: {
                settings: true,
                categories: {
                    where: { isActive: true },
                    include: {
                        items: {
                            where: { isAvailable: true },
                            orderBy: { displayOrder: 'asc' },
                        },
                    },
                    orderBy: { displayOrder: 'asc' },
                },
            },
        });
        if (!restaurant || !restaurant.isActive) {
            throw new common_1.NotFoundException('Restaurant not found');
        }
        const categories = restaurant.categories.map((category) => ({
            ...category,
            name: category.nameTranslations?.[language] || category.name,
            description: category.description || undefined,
            items: category.items.map((item) => ({
                ...item,
                name: item.nameTranslations?.[language] || item.name,
                description: item.descriptionTranslations?.[language] ||
                    item.description ||
                    undefined,
            })),
        }));
        return {
            restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                description: restaurant.description,
                logo: restaurant.settings?.customLogo || restaurant.logo,
                coverImage: restaurant.coverImage,
                currency: restaurant.currency,
                taxRate: restaurant.taxRate,
            },
            settings: restaurant.settings,
            categories,
            currentLanguage: language,
            availableLanguages: restaurant.settings?.languages || ['en'],
        };
    }
};
exports.MenusService = MenusService;
exports.MenusService = MenusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MenusService);
//# sourceMappingURL=menus.service.js.map