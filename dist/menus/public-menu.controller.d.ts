import { MenusService } from './menus.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class PublicMenuController {
    private readonly menusService;
    private readonly prisma;
    constructor(menusService: MenusService, prisma: PrismaService);
    getPublicMenu(restaurantId: string, language?: string): Promise<{
        restaurant: {
            id: string;
            name: string;
            description: string;
            logo: string;
            coverImage: string;
            currency: string;
            taxRate: number;
        };
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
        categories: {
            name: any;
            description: string;
            items: {
                name: any;
                description: any;
                id: string;
                nameTranslations: import("@prisma/client/runtime/library").JsonValue | null;
                image: string | null;
                displayOrder: number;
                createdAt: Date;
                updatedAt: Date;
                restaurantId: string;
                categoryId: string;
                descriptionTranslations: import("@prisma/client/runtime/library").JsonValue | null;
                price: number;
                allergens: string[];
                dietaryInfo: string[];
                isAvailable: boolean;
                isFeatured: boolean;
            }[];
            id: string;
            nameTranslations: import("@prisma/client/runtime/library").JsonValue | null;
            image: string | null;
            displayOrder: number;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            restaurantId: string;
        }[];
        currentLanguage: string;
        availableLanguages: string[];
    }>;
}
