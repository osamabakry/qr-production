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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AnalyticsService = class AnalyticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getRestaurantAnalytics(restaurantId, startDate, endDate) {
        const where = { restaurantId };
        if (startDate || endDate) {
            where.date = {};
            if (startDate)
                where.date.gte = startDate;
            if (endDate)
                where.date.lte = endDate;
        }
        const analytics = await this.prisma.menuAnalytics.findMany({
            where,
            orderBy: { date: 'desc' },
            take: 30,
        });
        const totals = analytics.reduce((acc, curr) => ({
            totalViews: acc.totalViews + curr.views,
            totalUniqueViews: acc.totalUniqueViews + curr.uniqueViews,
            totalQrScans: acc.totalQrScans + curr.qrScans,
        }), { totalViews: 0, totalUniqueViews: 0, totalQrScans: 0 });
        const itemViewsMap = new Map();
        analytics.forEach((a) => {
            if (a.itemViews) {
                Object.entries(a.itemViews).forEach(([itemId, views]) => {
                    itemViewsMap.set(itemId, (itemViewsMap.get(itemId) || 0) + views);
                });
            }
        });
        const popularItems = Array.from(itemViewsMap.entries())
            .map(([itemId, views]) => ({ itemId, views }))
            .sort((a, b) => b.views - a.views)
            .slice(0, 10);
        const qrScans = await this.prisma.qrScan.findMany({
            where: {
                restaurantId,
                scannedAt: {
                    gte: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    lte: endDate || new Date(),
                },
            },
            include: {
                qrCode: {
                    include: {
                        table: true,
                    },
                },
            },
        });
        return {
            totals,
            dailyAnalytics: analytics,
            popularItems,
            qrScans: qrScans.length,
            qrScansByCode: this.groupScansByCode(qrScans),
        };
    }
    async recordMenuView(restaurantId, itemId, categoryId) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let analytics = await this.prisma.menuAnalytics.findUnique({
            where: {
                restaurantId_date: {
                    restaurantId,
                    date: today,
                },
            },
        });
        if (!analytics) {
            analytics = await this.prisma.menuAnalytics.create({
                data: {
                    restaurantId,
                    date: today,
                    views: 1,
                    uniqueViews: 1,
                },
            });
        }
        else {
            analytics = await this.prisma.menuAnalytics.update({
                where: { id: analytics.id },
                data: {
                    views: { increment: 1 },
                },
            });
        }
        if (itemId || categoryId) {
            const itemViews = analytics.itemViews || {};
            const categoryViews = analytics.categoryViews || {};
            if (itemId) {
                itemViews[itemId] = (itemViews[itemId] || 0) + 1;
            }
            if (categoryId) {
                categoryViews[categoryId] = (categoryViews[categoryId] || 0) + 1;
            }
            await this.prisma.menuAnalytics.update({
                where: { id: analytics.id },
                data: {
                    itemViews,
                    categoryViews,
                },
            });
        }
        return analytics;
    }
    groupScansByCode(scans) {
        const grouped = new Map();
        scans.forEach((scan) => {
            const code = scan.qrCode?.code || 'unknown';
            grouped.set(code, (grouped.get(code) || 0) + 1);
        });
        return Array.from(grouped.entries()).map(([code, count]) => ({ code, count }));
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map