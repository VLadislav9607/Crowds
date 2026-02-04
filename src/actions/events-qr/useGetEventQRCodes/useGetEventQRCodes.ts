import { TANSTACK_QUERY_KEYS } from '@constants';
import { UseGetEventQRCodesBodyDto, UseGetEventQRCodesResDto } from './types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getEventsInEventsFolderAction } from './action';
import {
  createQuerySelectData,
  getInfiniteQueryFn,
  getInfiniteQueryNextPageParams,
  IInfinityQueryOptions,
} from '@services';

export const useGetEventQRCodes = (
  params: UseGetEventQRCodesBodyDto,
  options?: IInfinityQueryOptions<UseGetEventQRCodesResDto>,
) => {
  return useInfiniteQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.GET_EVENT_QR_CODES,
      params.event_id,
      JSON.stringify(params),
    ],
    initialPageParam: 1,
    queryFn: getInfiniteQueryFn(getEventsInEventsFolderAction, params),
    getNextPageParam: getInfiniteQueryNextPageParams,
    select: createQuerySelectData<UseGetEventQRCodesResDto>(),
    ...options,
  });
};
