import { useMutation } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { IMutationOptions, queryClient } from '@services';
import { clearAllNotificationsAction } from './action';

export const useClearAllNotifications = (
  options?: IMutationOptions<void, Error, void>,
) => {
  return useMutation({
    mutationFn: clearAllNotificationsAction,
    ...options,
    onSuccess: async (data, variables, context) => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_NOTIFICATIONS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_UNREAD_NOTIFICATIONS_COUNT],
        }),
      ]);
      await options?.onSuccess?.(data, variables, context);
    },
  });
};
