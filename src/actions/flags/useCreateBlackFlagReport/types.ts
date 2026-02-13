export interface CreateBlackFlagReportBodyDto {
  targetType: 'talent';
  targetId: string;
  eventId: string;
  description: string;
}

export interface CreateBlackFlagReportRespDto {
  targetId: string;
  eventId: string;
}
