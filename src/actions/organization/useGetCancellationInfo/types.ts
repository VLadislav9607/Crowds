export interface GetCancellationInfoBodyDto {
  eventId: string;
}

export interface CancellationInfoDto {
  is_within_5_days: boolean;
  cancellation_count: number;
  cancellation_threshold: number;
  event_status: string;
  start_at: string | null;
}
