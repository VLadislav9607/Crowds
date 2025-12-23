export interface VerifyOtpBodyDto {
    email: string;
    otp_code: string;
}

export interface VerifyOtpRespDto {
    success: boolean;
    expires_at: string;
    verification_token: string;
}