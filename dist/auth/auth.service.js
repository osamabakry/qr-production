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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AuthService = class AuthService {
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { phone: dto.phone },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this phone number already exists');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                phone: dto.phone,
                passwordHash,
                firstName: dto.firstName,
                lastName: dto.lastName,
                role: dto.role || client_1.UserRole.RESTAURANT_OWNER,
            },
            select: {
                id: true,
                phone: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
            },
        });
        const tokens = await this.generateTokens(user.id, user.phone, user.role);
        return {
            user: {
                id: user.id,
                phone: user.phone,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
            ...tokens,
        };
    }
    async login(dto) {
        try {
            if (!dto.phone) {
                throw new common_1.UnauthorizedException('Phone number is required');
            }
            const user = await this.prisma.user.findUnique({
                where: { phone: dto.phone },
            });
            if (!user || !user.isActive) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            if (!dto.password || dto.password.trim() === '') {
                if (!user.requiresPasswordChange) {
                    throw new common_1.UnauthorizedException('Password is required');
                }
                const tempToken = this.jwtService.sign({ sub: user.id, phone: user.phone, role: user.role, setupPassword: true }, {
                    secret: this.configService.get('JWT_SECRET'),
                    expiresIn: '15m',
                });
                return {
                    user: {
                        id: user.id,
                        phone: user.phone,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                    },
                    accessToken: tempToken,
                    refreshToken: tempToken,
                    requiresPasswordSetup: true,
                };
            }
            const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const tokens = await this.generateTokens(user.id, user.phone, user.role);
            return {
                user: {
                    id: user.id,
                    phone: user.phone,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                },
                ...tokens,
                requiresPasswordSetup: false,
            };
        }
        catch (error) {
            console.error('Login service error:', error);
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            if (error.code === 'P2002' || error.code === 'P2025') {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            throw new common_1.UnauthorizedException(error.message || 'Login failed');
        }
    }
    async setPassword(userId, dto) {
        if (dto.password !== dto.confirmPassword) {
            throw new common_1.UnauthorizedException('Passwords do not match');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                passwordHash,
                requiresPasswordChange: false
            },
            select: {
                id: true,
                phone: true,
                firstName: true,
                lastName: true,
                role: true,
            },
        });
        const tokens = await this.generateTokens(user.id, user.phone, user.role);
        return {
            user,
            ...tokens,
            message: 'Password set successfully',
        };
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });
            const tokenRecord = await this.prisma.refreshToken.findUnique({
                where: { token: refreshToken },
                include: { user: true },
            });
            if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const tokens = await this.generateTokens(payload.sub, payload.phone, payload.role);
            await this.prisma.refreshToken.delete({
                where: { token: refreshToken },
            });
            return tokens;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async logout(refreshToken) {
        await this.prisma.refreshToken.deleteMany({
            where: { token: refreshToken },
        });
    }
    async generateTokens(userId, phone, role) {
        const payload = { sub: userId, phone, role };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES_IN') || '15m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') || '7d',
        });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId,
                expiresAt,
            },
        });
        return {
            accessToken,
            refreshToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map