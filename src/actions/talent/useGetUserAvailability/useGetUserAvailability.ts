import { useQuery } from '@tanstack/react-query';
import { IQueryOptions } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { getUserAvailabilityAction } from './action';
import { GetUserAvailabilityResDto } from './types';

export const useGetUserAvailability = (
  options?: IQueryOptions<GetUserAvailabilityResDto | null>,
) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_USER_AVAILABILITY],
    queryFn: getUserAvailabilityAction,
    ...options,
  });
};

