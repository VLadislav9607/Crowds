import { useInfiniteQuery } from '@tanstack/react-query';
import { getOrgEventsAction } from './action';
import { UseGetOrgEventsBodyDto, UseGetOrgEventsResDto } from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';
import {
  IInfinityQueryOptions,
  getInfiniteQueryNextPageParams,
  getInfiniteQueryFn,
  createQuerySelectData,
} from '@services';

export const useGetOrgEvents = (
  params: UseGetOrgEventsBodyDto,
  options?: IInfinityQueryOptions<UseGetOrgEventsResDto>,
) => {
  return useInfiniteQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_ORG_EVENTS, JSON.stringify(params)],
    initialPageParam: 1,
    queryFn: getInfiniteQueryFn(getOrgEventsAction, params),
    getNextPageParam: getInfiniteQueryNextPageParams,
    select: createQuerySelectData<UseGetOrgEventsResDto>(),
    ...options,
  });
};
