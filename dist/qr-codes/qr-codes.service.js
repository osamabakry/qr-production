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
exports.QrCodesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const storage_service_1 = require("../storage/storage.service");
const QRCode = require("qrcode");
const uuid_1 = require("uuid");
let QrCodesService = class QrCodesService {
    constructor(prisma, storageService, configService) {
        this.prisma = prisma;
        this.storageService = storageService;
        this.configService = configService;
    }
    async generateQrCode(restaurantId, tableId) {
        if (tableId) {
            const existing = await this.prisma.qrCode.findUnique({
                where: { tableId },
            });
            if (existing) {
                return existing;
            }
        }
        const code = (0, uuid_1.v4)();
        const baseUrl = this.configService.get('QR_BASE_URL') || 'http://localhost:3000/menu';
        const publicUrl = `${baseUrl}/${code}`;
        const qrImageBuffer = await QRCode.toBuffer(publicUrl, {
            errorCorrectionLevel: 'H',
            type: 'png',
            width: 500,
            margin: 2,
        });
        const qrImageUrl = await this.storageService.uploadFile(qrImageBuffer, `qr-codes/${restaurantId}/${code}.png`, 'image/png');
        const qrCode = await this.prisma.qrCode.create({
            data: {
                restaurantId,
                tableId,
                code,
                qrImageUrl,
                publicUrl,
            },
            include: {
                table: true,
            },
        });
        return qrCode;
    }
    async getQrCodeByCode(code) {
        const qrCode = await this.prisma.qrCode.findUnique({
            where: { code },
            include: {
                restaurant: {
                    include: {
                        settings: true,
                    },
                },
                table: true,
            },
        });
        if (!qrCode) {
            throw new common_1.NotFoundException('QR code not found');
        }
        await this.trackScan(qrCode.id, qrCode.restaurantId);
        return qrCode;
    }
    async getQrCodes(restaurantId) {
        return this.prisma.qrCode.findMany({
            where: { restaurantId },
            include: {
                table: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getQrCode(id, restaurantId) {
        const qrCode = await this.prisma.qrCode.findFirst({
            where: { id, restaurantId },
            include: {
                table: true,
            },
        });
        if (!qrCode) {
            throw new common_1.NotFoundException('QR code not found');
        }
        return qrCode;
    }
    async deleteQrCode(id, restaurantId) {
        const qrCode = await this.prisma.qrCode.findFirst({
            where: { id, restaurantId },
        });
        if (!qrCode) {
            throw new common_1.NotFoundException('QR code not found');
        }
        if (qrCode.qrImageUrl) {
            await this.storageService.deleteFile(qrCode.qrImageUrl);
        }
        return this.prisma.qrCode.delete({
            where: { id },
        });
    }
    async trackScan(qrCodeId, restaurantId, ipAddress, userAgent) {
        await this.prisma.qrCode.update({
            where: { id: qrCodeId },
            data: {
                scanCount: { increment: 1 },
                lastScannedAt: new Date(),
            },
        });
        await this.prisma.qrScan.create({
            data: {
                qrCodeId,
                restaurantId,
                ipAddress,
                userAgent,
            },
        });
    }
};
exports.QrCodesService = QrCodesService;
exports.QrCodesService = QrCodesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        storage_service_1.StorageService,
        config_1.ConfigService])
], QrCodesService);
//# sourceMappingURL=qr-codes.service.js.map