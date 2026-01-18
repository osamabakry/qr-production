import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getPlatformStats(): Promise<{
        stats: {
            totalRestaurants: number;
            totalUsers: number;
            totalSubscriptions: number;
            activeSubscriptions: number;
            cancelledSubscriptions: number;
            pastDueSubscriptions: number;
            totalQrCodes: number;
            totalScans: number;
            totalMenuItems: number;
            totalCategories: number;
            totalBranches: number;
        };
        growth: {
            restaurants: {
                last24h: number;
                last7d: number;
                last30d: number;
                growthRate7d: string;
            };
            users: {
                last24h: number;
                last7d: number;
                last30d: number;
                growthRate7d: string;
            };
            scans: {
                last24h: number;
                last7d: number;
                last30d: number;
                growthRate7d: string;
            };
        };
        subscriptionBreakdown: {
            plan: import(".prisma/client").$Enums.SubscriptionPlan;
            count: number;
        }[];
        subscriptionStatusBreakdown: {
            status: import(".prisma/client").$Enums.SubscriptionStatus;
            count: number;
        }[];
        topRestaurantsByScans: ({
            subscription: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                plan: import(".prisma/client").$Enums.SubscriptionPlan;
                status: import(".prisma/client").$Enums.SubscriptionStatus;
                stripeCustomerId: string | null;
                stripeSubscriptionId: string | null;
                currentPeriodStart: Date | null;
                currentPeriodEnd: Date | null;
                cancelAtPeriodEnd: boolean;
                restaurantId: string;
            };
            _count: {
                branches: number;
                categories: number;
                menuItems: number;
                qrCodes: number;
            };
            owner: {
                phone: string;
                firstName: string;
                lastName: string;
                id: string;
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
        })[];
        recentRestaurants: ({
            subscription: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                plan: import(".prisma/client").$Enums.SubscriptionPlan;
                status: import(".prisma/client").$Enums.SubscriptionStatus;
                stripeCustomerId: string | null;
                stripeSubscriptionId: string | null;
                currentPeriodStart: Date | null;
                currentPeriodEnd: Date | null;
                cancelAtPeriodEnd: boolean;
                restaurantId: string;
            };
            _count: {
                branches: number;
                categories: number;
                menuItems: number;
                qrCodes: number;
            };
            owner: {
                phone: string;
                firstName: string;
                lastName: string;
                id: string;
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
        })[];
        restaurantsWithMostItems: ({
            subscription: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                plan: import(".prisma/client").$Enums.SubscriptionPlan;
                status: import(".prisma/client").$Enums.SubscriptionStatus;
                stripeCustomerId: string | null;
                stripeSubscriptionId: string | null;
                currentPeriodStart: Date | null;
                currentPeriodEnd: Date | null;
                cancelAtPeriodEnd: boolean;
                restaurantId: string;
            };
            _count: {
                categories: number;
                menuItems: number;
                qrCodes: number;
            };
            owner: {
                phone: string;
                firstName: string;
                lastName: string;
                id: string;
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
        })[];
    }>;
    getAllSubscriptions(): Promise<({
        restaurant: {
            owner: {
                phone: string;
                firstName: string;
                lastName: string;
                id: string;
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        plan: import(".prisma/client").$Enums.SubscriptionPlan;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        stripeCustomerId: string | null;
        stripeSubscriptionId: string | null;
        currentPeriodStart: Date | null;
        currentPeriodEnd: Date | null;
        cancelAtPeriodEnd: boolean;
        restaurantId: string;
    })[]>;
    updateSubscription(restaurantId: string, body: {
        plan?: string;
        status?: string;
    }): Promise<{
        restaurant: {
            _count: {
                branches: number;
                categories: number;
                menuItems: number;
                qrCodes: number;
            };
            owner: {
                phone: string;
                firstName: string;
                lastName: string;
                id: string;
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        plan: import(".prisma/client").$Enums.SubscriptionPlan;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        stripeCustomerId: string | null;
        stripeSubscriptionId: string | null;
        currentPeriodStart: Date | null;
        currentPeriodEnd: Date | null;
        cancelAtPeriodEnd: boolean;
        restaurantId: string;
    }>;
    cancelSubscription(restaurantId: string): Promise<{
        restaurant: {
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        plan: import(".prisma/client").$Enums.SubscriptionPlan;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        stripeCustomerId: string | null;
        stripeSubscriptionId: string | null;
        currentPeriodStart: Date | null;
        currentPeriodEnd: Date | null;
        cancelAtPeriodEnd: boolean;
        restaurantId: string;
    }>;
    renewSubscription(restaurantId: string, body: {
        duration?: number;
        plan?: string;
    }): Promise<{
        restaurant: {
            _count: {
                branches: number;
                categories: number;
                menuItems: number;
                qrCodes: number;
            };
            owner: {
                phone: string;
                firstName: string;
                lastName: string;
                id: string;
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        plan: import(".prisma/client").$Enums.SubscriptionPlan;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        stripeCustomerId: string | null;
        stripeSubscriptionId: string | null;
        currentPeriodStart: Date | null;
        currentPeriodEnd: Date | null;
        cancelAtPeriodEnd: boolean;
        restaurantId: string;
    }>;
    getRestaurant(restaurantId: string): Promise<{
        subscription: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            plan: import(".prisma/client").$Enums.SubscriptionPlan;
            status: import(".prisma/client").$Enums.SubscriptionStatus;
            stripeCustomerId: string | null;
            stripeSubscriptionId: string | null;
            currentPeriodStart: Date | null;
            currentPeriodEnd: Date | null;
            cancelAtPeriodEnd: boolean;
            restaurantId: string;
        };
        _count: {
            branches: number;
            categories: number;
            menuItems: number;
            qrCodes: number;
        };
        owner: {
            phone: string;
            firstName: string;
            lastName: string;
            id: string;
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
    }>;
}
