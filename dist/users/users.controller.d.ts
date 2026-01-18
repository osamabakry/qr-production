import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(user: any): Promise<{
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
