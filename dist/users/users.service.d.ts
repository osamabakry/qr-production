import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        phone: string;
        firstName: string;
        lastName: string;
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        restaurants: {
            name: string;
            id: string;
            slug: string;
        }[];
    }>;
}
