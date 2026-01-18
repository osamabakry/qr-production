export declare class CreateCategoryDto {
    name: string;
    nameTranslations?: any;
    description?: string;
    image?: string;
}
export declare class UpdateCategoryDto extends CreateCategoryDto {
    displayOrder?: number;
    isActive?: boolean;
}
export declare class CreateMenuItemDto {
    categoryId: string;
    name: string;
    nameTranslations?: any;
    description?: string;
    descriptionTranslations?: any;
    price: number;
    image?: string;
    allergens?: string[];
    dietaryInfo?: string[];
    isFeatured?: boolean;
}
export declare class UpdateMenuItemDto extends CreateMenuItemDto {
    isAvailable?: boolean;
    displayOrder?: number;
}
