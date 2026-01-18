import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
export declare class QrCodesService {
    private prisma;
    private storageService;
    private configService;
    constructor(prisma: PrismaService, storageService: StorageService, configService: ConfigService);
    generateQrCode(restaurantId: string, tableId?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
        tableId: string | null;
        code: string;
        qrImageUrl: string | null;
        publicUrl: string;
        scanCount: number;
        lastScannedAt: Date | null;
    }>;
    getQrCodeByCode(code: string): Promise<{
        restaurant: {
            settings: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: string;
                primaryColor: string | null;
                secondaryColor: string | null;
                customLogo: string | null;
                customDomain: string | null;
                languages: string[];
                defaultLanguage: string;
                allowLanguageSwitch: boolean;
                showPrices: boolean;
                showTax: boolean;
            };
        } & {
            phone: string | null;
            name: string;
            description: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            logo: string | null;
            coverImage: string | null;
            email: string | null;
            website: string | null;
            address: string | null;
            city: string | null;
            country: string | null;
            timezone: string;
            currency: string;
            taxRate: number;
            ownerId: string;
        };
        table: {
            number: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            restaurantId: string;
            branchId: string | null;
            capacity: number | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
        tableId: string | null;
        code: string;
        qrImageUrl: string | null;
        publicUrl: string;
        scanCount: number;
        lastScannedAt: Date | null;
    }>;
    getQrCodes(restaurantId: string): Promise<({
        table: {
            number: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            restaurantId: string;
            branchId: string | null;
            capacity: number | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
        tableId: string | null;
        code: string;
        qrImageUrl: string | null;
        publicUrl: string;
        scanCount: number;
        lastScannedAt: Date | null;
    })[]>;
    getQrCode(id: string, restaurantId: string): Promise<{
        table: {
            number: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            restaurantId: string;
            branchId: string | null;
            capacity: number | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
        tableId: string | null;
        code: string;
        qrImageUrl: string | null;
        publicUrl: string;
        scanCount: number;
        lastScannedAt: Date | null;
    }>;
    deleteQrCode(id: string, restaurantId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
        tableId: string | null;
        code: string;
        qrImageUrl: string | null;
        publicUrl: string;
        scanCount: number;
        lastScannedAt: Date | null;
    }>;
    private trackScan;
}
