export interface CreateKycSessionRespDto {
  success: boolean;
  redirectUrl: string;
}

export interface CreateKycSessionBodyDto {
  userId: string;
  firstName: string;
  lastName: string;
  dob: string;
}
