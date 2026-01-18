import { BranchesService } from './branches.service';
import { CreateBranchDto, UpdateBranchDto } from './dto/branch.dto';
export declare class BranchesController {
    private readonly branchesService;
    constructor(branchesService: BranchesService);
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
    findOne(restaurantId: string, id: string): Promise<{
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
    update(restaurantId: string, id: string, dto: UpdateBranchDto): Promise<{
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
    remove(restaurantId: string, id: string): Promise<{
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
