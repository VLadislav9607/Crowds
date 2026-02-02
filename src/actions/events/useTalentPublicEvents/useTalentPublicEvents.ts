import { useInfiniteQuery } from '@tanstack/react-query';
import { searchPublicEventsAction } from './action';
import {
  TalentPublicEvent,
  TalentPublicEventsBodyDto,
  TalentPublicEventsResDto,
} from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';
import {
  IInfinityQueryOptions,
  getInfiniteQueryNextPageParams,
  IWithPaginationResponse,
  getInfiniteQueryFn,
  createQuerySelectData,
} from '@services';

export const useTalentPublicEvents = (
  params: TalentPublicEventsBodyDto,
  options?: IInfinityQueryOptions<IWithPaginationResponse<TalentPublicEvent[]>>,
) => {
  return useInfiniteQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.SEARCH_PUBLIC_EVENTS,
      JSON.stringify(params),
    ],
    initialPageParam: 1,
    queryFn: getInfiniteQueryFn(searchPublicEventsAction, params),
    getNextPageParam: getInfiniteQueryNextPageParams,
    select: createQuerySelectData<TalentPublicEventsResDto>(),
    ...options,
  });
};
