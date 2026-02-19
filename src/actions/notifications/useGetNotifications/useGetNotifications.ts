import { TANSTACK_QUERY_KEYS } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { IQueryOptions } from '@services';
import { getNotificationsAction } from './action';
import { GetNotificationsResDto } from './types';

export const useGetNotifications = (
  options?: IQueryOptions<GetNotificationsResDto>,
) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_NOTIFICATIONS],
    queryFn: getNotificationsAction,
    staleTime: 0,
    ...options,
  });
};
