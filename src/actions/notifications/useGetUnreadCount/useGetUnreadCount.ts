import { TANSTACK_QUERY_KEYS } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { IQueryOptions } from '@services';
import { getUnreadNotificationsCountAction } from './action';

export const useGetUnreadNotificationsCount = (
  options?: IQueryOptions<number>,
) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_UNREAD_NOTIFICATIONS_COUNT],
    queryFn: getUnreadNotificationsCountAction,
    ...options,
  });
};
