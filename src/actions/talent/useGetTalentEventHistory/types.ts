import { IWithPaginationResponse } from '@services';

export interface GetTalentEventHistoryBodyDto {
  offset?: number;
}

export interface TalentEventHistoryItem {
  event_id: string;
  participation_id: string;
  title: string;
  brief: string | null;
  category_id: string | null;
  start_at: string;
  end_at: string;
  payment_amount: number | null;
  payment_mode: string | null;
  location: {
    city?: string;
    country?: string;
    formatted_address?: string;
    timezone?: string;
  };
  office_id: string | null;
  brand_name: string | null;
  brand_logo_path: string | null;
  payout_status:
    | 'awaiting_settlement'
    | 'processing'
    | 'paid'
    | 'rejected'
    | 'failed';
  payout_amount_cents: number | null;
  paid_at: string | null;
  rejection_reason: string | null;
}

export interface GetTalentEventHistoryResDto
  extends IWithPaginationResponse<TalentEventHistoryItem[]> {}
