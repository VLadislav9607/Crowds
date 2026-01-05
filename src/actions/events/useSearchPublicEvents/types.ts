import { IWithPaginationResponse, Tables } from '@services';

export interface UseSearchPublicEventsBodyDto {
  search_query?: string;
  limit?: number;
  offset?: number;
  user_lat?: number;
  user_lng?: number;
}

export interface SearchPublicEventsListItemDto
  extends Pick<
    Tables<'events'>,
    | 'id'
    | 'title'
    | 'category_id'
    | 'start_at'
    | 'end_at'
    | 'visibility'
    | 'payment_mode'
    | 'payment_amount'
    | 'brief'
    | 'nda_required'
  > {
  event_location: Pick<
    Tables<'event_locations'>,
    | 'formatted_address'
    | 'city'
    | 'country'
    | 'latitude'
    | 'longitude'
    | 'timezone'
  >;
}

export interface UseSearchPublicEventsResDto
  extends IWithPaginationResponse<SearchPublicEventsListItemDto[]> {}
