export interface CreateKycSdkTokenRespDto {
  success: boolean;
  clientId: string;
  sdkToken: string;
}

export interface CreateKycSdkTokenBodyDto {
  userId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dob?: string;
  appId: string;
  taxIdentificationNumber?: string;
}
