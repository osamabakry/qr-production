import { QrCodesService } from './qr-codes.service';
import { Request } from 'express';
export declare class PublicQrController {
    private readonly qrCodesService;
    constructor(qrCodesService: QrCodesService);
    getQrCodeByCode(code: string, req: Request): Promise<{
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
}
