export interface SendOtpBodyDto {
  email: string;
}

export interface SendOtpRespDto {
  success: boolean;
  message: string;
  expires_in: number
}