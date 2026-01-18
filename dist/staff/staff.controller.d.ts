import { StaffService } from './staff.service';
import { CreateStaffRoleDto, UpdateStaffRoleDto } from './dto/staff.dto';
export declare class StaffController {
    private readonly staffService;
    constructor(staffService: StaffService);
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
    findOne(restaurantId: string, id: string): Promise<{
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
    update(restaurantId: string, id: string, dto: UpdateStaffRoleDto): Promise<{
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        restaurantId: string;
        permissions: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    remove(restaurantId: string, id: string): Promise<{
        role: import(".prisma/client").$Enums.UserRole;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        restaurantId: string;
        permissions: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
