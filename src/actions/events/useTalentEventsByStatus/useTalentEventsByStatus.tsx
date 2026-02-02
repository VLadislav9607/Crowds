import { useInfiniteQuery } from '@tanstack/react-query';
import { getTalentEventsByStatusAction } from './action';
import { TANSTACK_QUERY_KEYS } from '@constants';
import {
  TalentParticipationEvent,
  UseTalentEventsByStatusBodyDto,
  UseTalentEventsByStatusResDto,
} from './types';
import {
  createQuerySelectData,
  getInfiniteQueryFn,
  getInfiniteQueryNextPageParams,
  IInfinityQueryOptions,
  IWithPaginationResponse,
} from '@services';

export const useTalentEventsByStatus = (
  params: Omit<UseTalentEventsByStatusBodyDto, 'offset'>,
  options?: IInfinityQueryOptions<
    IWithPaginationResponse<TalentParticipationEvent[]>
  >,
) => {
  return useInfiniteQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.TALENT_EVENTS_BY_STATUS,
      params.status,
      params.initiatedBy,
    ],
    initialPageParam: 1,
    queryFn: getInfiniteQueryFn(getTalentEventsByStatusAction, params),
    getNextPageParam: getInfiniteQueryNextPageParams,
    select: createQuerySelectData<UseTalentEventsByStatusResDto>(),
    ...options,
  });
};
