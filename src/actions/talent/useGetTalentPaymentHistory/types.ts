import { IWithPaginationResponse } from '@services';

export type PaymentHistoryTab = 'pending' | 'paid';

export interface GetTalentPaymentHistoryBodyDto {
  tab: PaymentHistoryTab;
  offset?: number;
}

export interface TalentPaymentHistoryItem {
  event_id: string;
  title: string;
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
  brand_name: string | null;
  brand_logo_path: string | null;
  payout_status: string;
  payout_amount_cents: number;
  payout_id: string;
}

export interface GetTalentPaymentHistoryResDto
  extends IWithPaginationResponse<TalentPaymentHistoryItem[]> {}
