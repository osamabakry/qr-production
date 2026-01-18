export declare class CreateBranchDto {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
}
export declare class UpdateBranchDto extends CreateBranchDto {
    isActive?: boolean;
}
