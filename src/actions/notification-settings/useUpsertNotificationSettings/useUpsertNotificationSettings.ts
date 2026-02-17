import { useMutation } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { IMutationOptions, queryClient } from '@services';
import { showErrorToast } from '@helpers';
import { GetNotificationSettingsResDto } from '../useGetNotificationSettings/types';
import { upsertNotificationSettingsAction } from './action';
import {
  UpsertNotificationSettingsBodyDto,
  UpsertNotificationSettingsResDto,
} from './types';

export const useUpsertNotificationSettings = (
  options?: IMutationOptions<
    UpsertNotificationSettingsResDto,
    Error,
    UpsertNotificationSettingsBodyDto
  >,
) => {
  return useMutation({
    mutationFn: upsertNotificationSettingsAction,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_NOTIFICATION_SETTINGS],
      });

      const previousData =
        queryClient.getQueryData<GetNotificationSettingsResDto>([
          TANSTACK_QUERY_KEYS.GET_NOTIFICATION_SETTINGS,
        ]);

      queryClient.setQueryData<GetNotificationSettingsResDto>(
        [TANSTACK_QUERY_KEYS.GET_NOTIFICATION_SETTINGS],
        { settings: newData.settings },
      );

      return { previousData };
    },
    onError: (error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [TANSTACK_QUERY_KEYS.GET_NOTIFICATION_SETTINGS],
          context.previousData,
        );
      }
      showErrorToast('Failed to save notification settings');
      options?.onError?.(error, _variables, context);
    },
    onSettled: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_NOTIFICATION_SETTINGS],
      });
      options?.onSettled?.(...args);
    },
    ...options,
  });
};
