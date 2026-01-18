import { PrismaService } from '../prisma/prisma.service';
import { CreateBranchDto, UpdateBranchDto } from './dto/branch.dto';
export declare class BranchesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(restaurantId: string, dto: CreateBranchDto): Promise<{
        phone: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        address: string | null;
        restaurantId: string;
    }>;
    findAll(restaurantId: string): Promise<({
        _count: {
            tables: number;
        };
    } & {
        phone: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        address: string | null;
        restaurantId: string;
    })[]>;
    findOne(id: string, restaurantId: string): Promise<{
        tables: {
            number: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            restaurantId: string;
            branchId: string | null;
            capacity: number | null;
        }[];
    } & {
        phone: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        address: string | null;
        restaurantId: string;
    }>;
    update(id: string, restaurantId: string, dto: UpdateBranchDto): Promise<{
        phone: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        address: string | null;
        restaurantId: string;
    }>;
    remove(id: string, restaurantId: string): Promise<{
        phone: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        address: string | null;
        restaurantId: string;
    }>;
}
