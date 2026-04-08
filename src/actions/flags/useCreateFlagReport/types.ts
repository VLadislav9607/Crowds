export type CreateFlagReportBodyDto =
  | {
      targetType: 'talent';
      targetId: string;
      eventId?: string;
      description: string;
    }
  | {
      targetType: 'organization';
      eventId: string;
      description: string;
    };

export interface CreateFlagReportRespDto {
  reportId: string;
  status: string;
}
