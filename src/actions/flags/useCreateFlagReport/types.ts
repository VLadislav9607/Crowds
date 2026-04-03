export interface CreateFlagReportBodyDto {
  targetType: 'talent' | 'organization';
  targetId: string;
  eventId: string;
  requestedFlagType: 'yellow' | 'red' | 'black';
  description: string;
}

export interface CreateFlagReportRespDto {
  reportId: string;
  status: string;
}
