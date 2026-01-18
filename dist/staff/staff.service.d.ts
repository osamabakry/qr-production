import { PrismaService } from '../prisma/prisma.service';
import { CreateStaffRoleDto, UpdateStaffRoleDto } from './dto/staff.dto';
export declare class StaffService {
    private prisma;
    constructor(prisma: PrismaService);
    create(restaurantId: string, dto: CreateStaffRoleDto): Promise<{
        user: {
            phone: string;
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        restaurantId: string;
        permissions: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    findAll(restaurantId: string): Promise<({
        user: {
            phone: string;
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        restaurantId: string;
        permissions: import("@prisma/client/runtime/library").JsonValue | null;
    })[]>;
    findOne(id: string, restaurantId: string): Promise<{
        user: {
            phone: string;
            firstName: string;
            lastName: string;
            id: string;
        };
    } & {
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        restaurantId: string;
        permissions: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    update(id: string, restaurantId: string, dto: UpdateStaffRoleDto): Promise<{
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        restaurantId: string;
        permissions: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    remove(id: string, restaurantId: string): Promise<{
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        restaurantId: string;
        permissions: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
