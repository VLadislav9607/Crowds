import { Enums, IWithPaginationResponse, Tables } from '@services';

export interface TalentPublicEventsBodyDto {
  search_query?: string;
  limit?: number;
  offset?: number;
  user_lat?: number;
  user_lng?: number;
  sort_mode?: string;
  filter_distance_km?: number;
  filter_date_from?: string; // ISO datetime string
  filter_date_to?: string; // ISO datetime string
  filter_payment_type?: 'hourly' | 'fixed';
}

export interface TalentPublicEvent {
  brief: string;
  category_id: string;
  created_at: string;
  end_at: string;
  event_id: string;
  is_in_any_folder: boolean;
  location: {
    city?: string;
    country?: string;
    formatted_address?: string;
    timezone?: string;
  };
  max_participations: number;
  participant: Tables<'event_participations'> | null;
  payment_amount: number;
  payment_mode: Enums<'EventPaymentMode'>;
  start_at: string;
}

export interface TalentPublicEventsResDto
  extends IWithPaginationResponse<TalentPublicEvent[]> {}
