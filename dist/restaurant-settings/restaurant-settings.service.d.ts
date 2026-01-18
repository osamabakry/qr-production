import { PrismaService } from '../prisma/prisma.service';
import { UpdateRestaurantSettingsDto } from './dto/settings.dto';
export declare class RestaurantSettingsService {
    private prisma;
    constructor(prisma: PrismaService);
    get(restaurantId: string): Promise<{
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
    }>;
    update(restaurantId: string, dto: UpdateRestaurantSettingsDto): Promise<{
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
    }>;
}
