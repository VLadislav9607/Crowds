export interface CreateOrgYellowFlagBodyDto {
  eventId: string;
  description: string;
}

export interface CreateOrgYellowFlagRespDto {
  flagId: string;
  organizationId: string;
  eventId: string;
  status: string;
  durationDays: number;
  expiresOn: string;
}
