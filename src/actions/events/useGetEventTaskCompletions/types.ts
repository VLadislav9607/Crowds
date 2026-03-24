export interface TaskCompletionTalentDto {
  taskCompletionId: string;
  talentId: string;
  participationId: string;
  name: string;
  avatar_url: string;
  location: string;
  flag: string;
  task_status: string;
  task_photo_path: string | null;
  task_submitted_at: string;
  task_reviewed_at: string | null;
  checked_in_at: string | null;
  checked_out_at: string | null;
  payout_status: string | null;
  payout_amount_cents: number | null;
  settlement_status: string | null;
}

export interface GetEventTaskCompletionsParams {
  eventId: string;
  offset?: number;
}

export interface GetEventTaskCompletionsRespDto {
  data: TaskCompletionTalentDto[];
  pagination: {
    offset: number;
  };
}
