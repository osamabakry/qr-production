import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getRestaurantAnalytics(restaurantId: string, startDate?: Date, endDate?: Date): Promise<{
        totals: {
            totalViews: number;
            totalUniqueViews: number;
            totalQrScans: number;
        };
        dailyAnalytics: {
            id: string;
            createdAt: Date;
            restaurantId: string;
            date: Date;
            views: number;
            uniqueViews: number;
            itemViews: import("@prisma/client/runtime/library").JsonValue | null;
            categoryViews: import("@prisma/client/runtime/library").JsonValue | null;
            qrScans: number;
        }[];
        popularItems: {
            itemId: string;
            views: number;
        }[];
        qrScans: number;
        qrScansByCode: {
            code: string;
            count: number;
        }[];
    }>;
    recordMenuView(restaurantId: string, itemId?: string, categoryId?: string): Promise<{
        id: string;
        createdAt: Date;
        restaurantId: string;
        date: Date;
        views: number;
        uniqueViews: number;
        itemViews: import("@prisma/client/runtime/library").JsonValue | null;
        categoryViews: import("@prisma/client/runtime/library").JsonValue | null;
        qrScans: number;
    }>;
    private groupScansByCode;
}
