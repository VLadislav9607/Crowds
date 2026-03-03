import { useMutation } from '@tanstack/react-query';
import { IMutationOptions, queryClient } from '@services';
import { showMutationErrorToast } from '@helpers';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { confirmEventPublicationAction } from './action';
import { ConfirmEventPublicationResDto } from './types';

export const useConfirmEventPublication = (
  options?: IMutationOptions<ConfirmEventPublicationResDto>,
) => {
  return useMutation({
    mutationFn: confirmEventPublicationAction,
    onError: (error: unknown) => showMutationErrorToast(error as Error),
    ...options,
    onSuccess: async (data, variables, res, context) => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_ORG_EVENTS_COUNTERS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_ORG_EVENTS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_FOR_ORG_MEMBER],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_PAYMENT],
        }),
      ]);
      await options?.onSuccess?.(data, variables, res, context);
    },
  });
};
