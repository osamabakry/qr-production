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
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let RestaurantsService = class RestaurantsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, userRole, dto) {
        try {
            const slug = await this.generateUniqueSlug(dto.name);
            let restaurantOwnerId = userId;
            if (userRole === 'SUPER_ADMIN' && dto.ownerPhone) {
                if (!dto.ownerPhone || dto.ownerPhone.trim() === '') {
                    throw new common_1.BadRequestException('Owner phone number is required');
                }
                let owner = await this.prisma.user.findUnique({
                    where: { phone: dto.ownerPhone },
                });
                if (!owner) {
                    const defaultPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
                    const passwordHash = await bcrypt.hash(defaultPassword, 10);
                    try {
                        owner = await this.prisma.user.create({
                            data: {
                                phone: dto.ownerPhone,
                                passwordHash,
                                firstName: dto.ownerFirstName,
                                lastName: dto.ownerLastName,
                                role: 'RESTAURANT_OWNER',
                                requiresPasswordChange: true,
                            },
                        });
                    }
                    catch (createError) {
                        if (createError.code === 'P2002') {
                            throw new common_1.ConflictException(`User with phone number ${dto.ownerPhone} already exists`);
                        }
                        throw new common_1.BadRequestException(`Failed to create user: ${createError.message}`);
                    }
                }
                restaurantOwnerId = owner.id;
            }
            else if (userRole === 'SUPER_ADMIN' && dto.ownerId) {
                restaurantOwnerId = dto.ownerId;
            }
            const subscriptionDuration = dto.subscriptionDuration || 1;
            const now = new Date();
            const periodStart = new Date(now);
            const periodEnd = new Date(now);
            periodEnd.setMonth(periodEnd.getMonth() + subscriptionDuration);
            const restaurant = await this.prisma.restaurant.create({
                data: {
                    name: dto.name,
                    description: dto.description,
                    phone: dto.phone,
                    email: dto.email,
                    website: dto.website,
                    address: dto.address,
                    city: dto.city,
                    country: dto.country,
                    currency: dto.currency || 'EGP',
                    taxRate: dto.taxRate || 0,
                    slug,
                    ownerId: restaurantOwnerId,
                    subscription: {
                        create: {
                            plan: dto.plan || 'PRO',
                            status: 'ACTIVE',
                            currentPeriodStart: periodStart,
                            currentPeriodEnd: periodEnd,
                        },
                    },
                    settings: {
                        create: {
                            languages: ['ar', 'en'],
                            defaultLanguage: 'ar',
                        },
                    },
                },
                include: {
                    subscription: true,
                    settings: true,
                    owner: {
                        select: {
                            id: true,
                            phone: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            });
            return restaurant;
        }
        catch (error) {
            console.error('Error in restaurant create:', error);
            if (error.code === 'P2002') {
                const field = error.meta?.target?.[0] || 'field';
                throw new common_1.ConflictException(`A restaurant with this ${field} already exists`);
            }
            if (error.code === 'P2003') {
                throw new common_1.BadRequestException('Invalid owner reference');
            }
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.ConflictException ||
                error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(error.message || 'Failed to create restaurant');
        }
    }
    async findAll(userId, userRole) {
        if (userRole === 'SUPER_ADMIN') {
            return this.prisma.restaurant.findMany({
                include: {
                    subscription: true,
                    owner: {
                        select: {
                            id: true,
                            phone: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                    _count: {
                        select: {
                            branches: true,
                            categories: true,
                            menus: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            });
        }
        return this.prisma.restaurant.findMany({
            where: {
                OR: [
                    { ownerId: userId },
                    {
                        staffRoles: {
                            some: { userId },
                        },
                    },
                ],
            },
            include: {
                subscription: true,
                _count: {
                    select: {
                        branches: true,
                        categories: true,
                        menus: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, userId, userRole) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id },
            include: {
                subscription: true,
                settings: true,
                owner: {
                    select: {
                        id: true,
                        phone: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                branches: true,
                _count: {
                    select: {
                        categories: true,
                        menus: true,
                        tables: true,
                        qrCodes: true,
                    },
                },
            },
        });
        if (!restaurant) {
            throw new common_1.NotFoundException('Restaurant not found');
        }
        if (userRole !== 'SUPER_ADMIN' && restaurant.ownerId !== userId) {
            const hasStaffAccess = await this.prisma.staffRole.findUnique({
                where: {
                    restaurantId_userId: {
                        restaurantId: id,
                        userId,
                    },
                },
            });
            if (!hasStaffAccess) {
                throw new common_1.ForbiddenException('Access denied');
            }
        }
        return restaurant;
    }
    async findBySlug(slug) {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { slug },
            include: {
                settings: true,
                subscription: true,
            },
        });
        if (!restaurant || !restaurant.isActive) {
            throw new common_1.NotFoundException('Restaurant not found');
        }
        return restaurant;
    }
    async update(id, userId, userRole, dto) {
        await this.verifyAccess(id, userId, userRole);
        const { primaryColor, ...restDto } = dto;
        if (restDto.name) {
            restDto.slug = await this.generateUniqueSlug(restDto.name);
        }
        const updateData = { ...restDto };
        if (primaryColor) {
            updateData.settings = {
                upsert: {
                    create: { primaryColor },
                    update: { primaryColor },
                },
            };
        }
        return this.prisma.restaurant.update({
            where: { id },
            data: updateData,
            include: {
                subscription: true,
                settings: true,
            },
        });
    }
    async remove(id, userId, userRole) {
        await this.verifyAccess(id, userId, userRole);
        return this.prisma.restaurant.delete({
            where: { id },
        });
    }
    async verifyAccess(restaurantId, userId, userRole) {
        if (userRole === 'SUPER_ADMIN') {
            return;
        }
        const restaurant = await this.prisma.restaurant.findFirst({
            where: {
                id: restaurantId,
                ownerId: userId,
            },
        });
        if (!restaurant) {
            throw new common_1.ForbiddenException('Access denied');
        }
    }
    async generateUniqueSlug(name) {
        const baseSlug = name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        const existing = await this.prisma.restaurant.findUnique({
            where: { slug: baseSlug },
        });
        if (!existing) {
            return baseSlug;
        }
        const uniqueSuffix = Math.random().toString(36).substring(2, 7);
        return `${baseSlug}-${uniqueSuffix}`;
    }
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RestaurantsService);
//# sourceMappingURL=restaurants.service.js.map