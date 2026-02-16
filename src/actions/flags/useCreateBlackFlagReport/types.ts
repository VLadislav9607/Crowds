export interface CreateBlackFlagReportBodyDto {
  targetType: 'talent' | 'organization';
  targetId: string;
  eventId: string;
  description: string;
}

export interface CreateBlackFlagReportRespDto {
  targetId: string;
  eventId: string;
}
