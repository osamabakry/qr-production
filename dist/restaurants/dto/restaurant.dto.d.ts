export declare class CreateRestaurantDto {
    name: string;
    description?: string;
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
    city?: string;
    country?: string;
    currency?: string;
    taxRate?: number;
    ownerPhone?: string;
    ownerId?: string;
    ownerFirstName?: string;
    ownerLastName?: string;
    plan?: string;
    subscriptionDuration?: number;
}
export declare class UpdateRestaurantDto extends CreateRestaurantDto {
    logo?: string;
    coverImage?: string;
    timezone?: string;
    slug?: string;
    primaryColor?: string;
}
