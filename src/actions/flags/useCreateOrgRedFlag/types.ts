export interface CreateOrgRedFlagBodyDto {
  eventId: string;
  description: string;
}

export interface CreateOrgRedFlagRespDto {
  flagId: string;
  organizationId: string;
  eventId: string;
  status: string;
  durationDays: number;
  expiresOn: string;
}
