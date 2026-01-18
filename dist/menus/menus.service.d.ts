import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto, CreateMenuItemDto, UpdateMenuItemDto } from './dto/menu.dto';
export declare class MenusService {
    private prisma;
    constructor(prisma: PrismaService);
    createCategory(restaurantId: string, dto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        nameTranslations: import("@prisma/client/runtime/library").JsonValue | null;
        description: string | null;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
    }>;
    getCategories(restaurantId: string): Promise<({
        _count: {
            items: number;
        };
    } & {
        id: string;
        name: string;
        nameTranslations: import("@prisma/client/runtime/library").JsonValue | null;
        description: string | null;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
    })[]>;
    getCategory(id: string, restaurantId: string): Promise<{
        items: {
            id: string;
            name: string;
            nameTranslations: import("@prisma/client/runtime/library").JsonValue | null;
            description: string | null;
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
    } & {
        id: string;
        name: string;
        nameTranslations: import("@prisma/client/runtime/library").JsonValue | null;
        description: string | null;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
    }>;
    updateCategory(id: string, restaurantId: string, dto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        nameTranslations: import("@prisma/client/runtime/library").JsonValue | null;
        description: string | null;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
    }>;
    deleteCategory(id: string, restaurantId: string): Promise<{
        id: string;
        name: string;
        nameTranslations: import("@prisma/client/runtime/library").JsonValue | null;
        description: string | null;
        image: string | null;
        displayOrder: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        restaurantId: string;
    }>;
    createMenuItem(restaurantId: string, dto: CreateMenuItemDto): Promise<{
        id: string;
        name: string;
        nameTranslations: import("@prisma/client/runtime/library").JsonValue | null;
        description: string | null;
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
    }>;
    getMenuItems(restaurantId: string, categoryId?: string): Promise<({
        category: {
            id: string;
            name: string;
            nameTranslations: import("@prisma/client/runtime/library").JsonValue;
        };
    } & {
        id: string;
        name: string;
        nameTranslations: import("@prisma/client/runtime/library").JsonValue | null;
        description: string | null;
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
    })[]>;
    getMenuItem(id: string, restaurantId: string): Promise<{
        category: {
            id: string;
            name: string;
            nameTranslations: import("@prisma/client/runtime/library").JsonValue | null;
            description: string | null;
            image: string | null;
            displayOrder: number;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            restaurantId: string;
        };
    } & {
        id: string;
        name: string;
        nameTranslations: import("@prisma/client/runtime/library").JsonValue | null;
        description: string | null;
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
    }>;
    updateMenuItem(id: string, restaurantId: string, dto: UpdateMenuItemDto): Promise<{
        id: string;
        name: string;
        nameTranslations: import("@prisma/client/runtime/library").JsonValue | null;
        description: string | null;
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
    }>;
    deleteMenuItem(id: string, restaurantId: string): Promise<{
        id: string;
        name: string;
        nameTranslations: import("@prisma/client/runtime/library").JsonValue | null;
        description: string | null;
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
    }>;
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
