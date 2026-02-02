import { IWithPaginationResponse, Tables } from '@services';
import { ITalentEventCard } from '../../../modules/events/talent/components/TalentEventCard/types';

export interface UseGetEventsInEventsFolderBodyDto {
  folder_id: string;
  offset?: number;
  limit?: number;
}

export interface IEventInEventsFolder extends ITalentEventCard {
  participation_id: string;
  event_id: string;
  brief: string;
  category_id: string;
  event_title: string;
  payment_amount: number;
  payment_mode: string;
  formatted_address: string;
  start_at: string;
  end_at: string;
  max_participations: number;
  created_at: string;
  can_reaccept: boolean;
  participant: Tables<'event_participations'> | null;
}

export interface UseGetEventsInEventsFolderResDto
  extends IWithPaginationResponse<IEventInEventsFolder[]> {}
