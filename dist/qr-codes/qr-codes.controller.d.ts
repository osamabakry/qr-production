import { QrCodesService } from './qr-codes.service';
export declare class QrCodesController {
    private readonly qrCodesService;
    constructor(qrCodesService: QrCodesService);
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
    getQrCode(restaurantId: string, id: string): Promise<{
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
    deleteQrCode(restaurantId: string, id: string): Promise<{
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
