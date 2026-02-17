import { TANSTACK_QUERY_KEYS } from '@constants';
import { useQuery } from '@tanstack/react-query';
import { IQueryOptions } from '@services';
import { getNotificationSettingsAction } from './action';
import { GetNotificationSettingsResDto } from './types';

export const useGetNotificationSettings = (
  options?: IQueryOptions<GetNotificationSettingsResDto>,
) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_NOTIFICATION_SETTINGS],
    queryFn: getNotificationSettingsAction,
    ...options,
  });
};
