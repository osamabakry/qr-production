export declare class RegisterDto {
    phone: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}
export declare class LoginDto {
    phone: string;
    password?: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class SetPasswordDto {
    password: string;
    confirmPassword: string;
}
