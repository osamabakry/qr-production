import { MenusService } from './menus.service';
import { CreateCategoryDto, UpdateCategoryDto, CreateMenuItemDto, UpdateMenuItemDto } from './dto/menu.dto';
export declare class MenusController {
    private readonly menusService;
    constructor(menusService: MenusService);
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
    getCategory(restaurantId: string, id: string): Promise<{
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
    updateCategory(restaurantId: string, id: string, dto: UpdateCategoryDto): Promise<{
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
    deleteCategory(restaurantId: string, id: string): Promise<{
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
    getMenuItem(restaurantId: string, id: string): Promise<{
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
    updateMenuItem(restaurantId: string, id: string, dto: UpdateMenuItemDto): Promise<{
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
    deleteMenuItem(restaurantId: string, id: string): Promise<{
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
}
