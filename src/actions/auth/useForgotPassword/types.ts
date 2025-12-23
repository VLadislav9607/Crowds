export interface ForgotPasswordBodyDto {
    username: string;
    uin: string;
    password: string
}

export interface ForgotPasswordRespDto {
    success: boolean;
    message: string;
}