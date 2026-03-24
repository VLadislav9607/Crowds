import { useMutation } from '@tanstack/react-query';
import { IMutationOptions, queryClient } from '@services';
import { showMutationErrorToast } from '@helpers';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { updateAvailabilityAction } from './action';

export const useUpdateAvailability = (options?: IMutationOptions<void>) => {
  return useMutation({
    mutationFn: updateAvailabilityAction,
    ...options,
    onSuccess: async (...args) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_USER_AVAILABILITY],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.SEARCH_PUBLIC_EVENTS],
        }),
      ]);
      await options?.onSuccess?.(...args);
    },
    onError: showMutationErrorToast,
  });
};
