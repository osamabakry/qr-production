import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getAnalytics(restaurantId: string, startDate?: string, endDate?: string): Promise<{
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
}
