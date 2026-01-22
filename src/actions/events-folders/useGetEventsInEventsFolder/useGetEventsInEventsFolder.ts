import { TANSTACK_QUERY_KEYS } from '@constants';
import {
  UseGetEventsInEventsFolderBodyDto,
  UseGetEventsInEventsFolderResDto,
} from './types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getEventsInEventsFolderAction } from './action';
import {
  createQuerySelectData,
  getInfiniteQueryFn,
  getInfiniteQueryNextPageParams,
  IInfinityQueryOptions,
} from '@services';

export const useGetEventsInEventsFolder = (
  params: UseGetEventsInEventsFolderBodyDto,
  options?: IInfinityQueryOptions<UseGetEventsInEventsFolderResDto>,
) => {
  return useInfiniteQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.GET_EVENTS_IN_EVENTS_FOLDER,
      params.folder_id,
      JSON.stringify(params),
    ],
    initialPageParam: 1,
    queryFn: getInfiniteQueryFn(getEventsInEventsFolderAction, params),
    getNextPageParam: getInfiniteQueryNextPageParams,
    select: createQuerySelectData<UseGetEventsInEventsFolderResDto>(),
    ...options,
  });
};
