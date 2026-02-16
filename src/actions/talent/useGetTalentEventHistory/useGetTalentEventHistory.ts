import { useInfiniteQuery } from '@tanstack/react-query';
import { getTalentEventHistoryAction } from './action';
import { TANSTACK_QUERY_KEYS } from '@constants';
import {
  TalentEventHistoryItem,
  GetTalentEventHistoryResDto,
} from './types';
import {
  createQuerySelectData,
  getInfiniteQueryFn,
  getInfiniteQueryNextPageParams,
  IInfinityQueryOptions,
  IWithPaginationResponse,
} from '@services';

export const useGetTalentEventHistory = (
  options?: IInfinityQueryOptions<
    IWithPaginationResponse<TalentEventHistoryItem[]>
  >,
) => {
  return useInfiniteQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_TALENT_EVENT_HISTORY],
    initialPageParam: 1,
    queryFn: getInfiniteQueryFn(getTalentEventHistoryAction, {}),
    getNextPageParam: getInfiniteQueryNextPageParams,
    select: createQuerySelectData<GetTalentEventHistoryResDto>(),
    ...options,
  });
};
