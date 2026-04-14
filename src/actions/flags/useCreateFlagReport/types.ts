export type CreateFlagReportBodyDto =
  | {
      targetType: 'talent';
      targetId: string;
      eventId?: string;
      description: string;
      requestedFlagType: 'yellow' | 'red' | 'black';
    }
  | {
      targetType: 'organization';
      eventId: string;
      description: string;
      requestedFlagType: 'yellow' | 'red' | 'black';
    };

export interface CreateFlagReportRespDto {
  reportId: string;
  status: string;
}
