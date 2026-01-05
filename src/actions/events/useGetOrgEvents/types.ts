import { Database, IWithPaginationResponse, Tables } from '@services';

export interface OrgEventListItemPublishedDto
  extends Pick<
    Tables<'events'>,
    | 'id'
    | 'title'
    | 'category_id'
    | 'start_at'
    | 'end_at'
    | 'status'
    | 'visibility'
    | 'payment_amount'
    | 'payment_mode'
  > {
  event_location: Pick<
    Tables<'event_locations'>,
    'formatted_address' | 'latitude' | 'longitude' | 'timezone'
  >;
  event_age_groups: Pick<
    Tables<'event_age_groups'>,
    'male_count' | 'female_count' | 'other_count'
  >[];
}

export interface OrgEventListDraftItemDto
  extends Partial<OrgEventListItemPublishedDto> {
  id: string;
  title: string;
}

export type OrgEventListItemDto =
  | OrgEventListItemPublishedDto
  | OrgEventListDraftItemDto;

export interface UseGetOrgEventsBodyDto {
  search_query?: string;
  status_filter?: Database['public']['Enums']['EventStatus'];
  visibility_filter?: Database['public']['Enums']['EventVisibility'];
  limit?: number;
  offset?: number;
  start_after?: string; // ISO datetime string - фільтрує: start_at > start_after
  start_before?: string; // ISO datetime string - фільтрує: start_at < start_before
  end_after?: string; // ISO datetime string - фільтрує: end_at > end_after
  end_before?: string; // ISO datetime string - фільтрує: end_at < end_before
}

export interface UseGetOrgEventsResDto
  extends IWithPaginationResponse<OrgEventListItemDto[]> {}
