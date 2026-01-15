import { IWithPaginationResponse } from '@services';
import { ITalentEventCard } from '../useTalentEventsByStatus';

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

export interface TalentPublicEventsResDto
  extends IWithPaginationResponse<ITalentEventCard[]> {}
