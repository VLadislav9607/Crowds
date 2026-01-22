import { IWithPaginationResponse } from '@services';
import { ITalentEventCard } from '../../events/useTalentEventsByStatus';

export interface UseGetEventsInEventsFolderBodyDto {
  folder_id: string;
  offset?: number;
  limit?: number;
}

export interface UseGetEventsInEventsFolderResDto
  extends IWithPaginationResponse<ITalentEventCard[]> {}
