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
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StaffService = class StaffService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(restaurantId, dto) {
        const user = await this.prisma.user.findUnique({
            where: { phone: dto.phone },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.prisma.staffRole.create({
            data: {
                restaurantId,
                userId: user.id,
                role: dto.role,
                permissions: dto.permissions,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        phone: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    }
    async findAll(restaurantId) {
        return this.prisma.staffRole.findMany({
            where: { restaurantId },
            include: {
                user: {
                    select: {
                        id: true,
                        phone: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    }
    async findOne(id, restaurantId) {
        const staffRole = await this.prisma.staffRole.findFirst({
            where: { id, restaurantId },
            include: {
                user: {
                    select: {
                        id: true,
                        phone: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        if (!staffRole) {
            throw new common_1.NotFoundException('Staff role not found');
        }
        return staffRole;
    }
    async update(id, restaurantId, dto) {
        return this.prisma.staffRole.update({
            where: { id },
            data: {
                role: dto.role,
                permissions: dto.permissions,
            },
        });
    }
    async remove(id, restaurantId) {
        return this.prisma.staffRole.delete({
            where: { id },
        });
    }
};
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StaffService);
//# sourceMappingURL=staff.service.js.map