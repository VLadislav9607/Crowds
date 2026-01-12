import { useInfiniteQuery } from '@tanstack/react-query';
import { searchPublicEventsAction } from './action';
import {
  UseSearchPublicEventsBodyDto,
  SearchPublicEventsListItemDto,
  UseSearchPublicEventsResDto,
} from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';
import {
  IInfinityQueryOptions,
  getInfiniteQueryNextPageParams,
  IWithPaginationResponse,
  getInfiniteQueryFn,
  createQuerySelectData,
} from '@services';

export const useSearchPublicEvents = (
  params: UseSearchPublicEventsBodyDto,
  options?: IInfinityQueryOptions<
    IWithPaginationResponse<SearchPublicEventsListItemDto[]>
  >,
) => {
  return useInfiniteQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.SEARCH_PUBLIC_EVENTS,
      JSON.stringify(params),
    ],
    initialPageParam: 1,
    queryFn: getInfiniteQueryFn(searchPublicEventsAction, params),
    getNextPageParam: getInfiniteQueryNextPageParams,
    select: createQuerySelectData<UseSearchPublicEventsResDto>(),
    ...options,
  });
};
