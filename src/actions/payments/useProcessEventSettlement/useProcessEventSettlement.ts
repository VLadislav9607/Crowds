import { useMutation } from '@tanstack/react-query';
import { IMutationOptions, queryClient } from '@services';
import { showMutationErrorToast } from '@helpers';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { processEventSettlementAction } from './action';
import { ProcessEventSettlementResDto } from './types';

export const useProcessEventSettlement = (
  options?: IMutationOptions<ProcessEventSettlementResDto>,
) => {
  return useMutation({
    mutationFn: processEventSettlementAction,
    onError: (error: unknown) => showMutationErrorToast(error as Error),
    ...options,
    onSuccess: async (data, variables, res, context) => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_TASK_COMPLETIONS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_PAYMENT],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_FOR_ORG_MEMBER],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_ORG_EVENTS],
        }),
      ]);
      await options?.onSuccess?.(data, variables, res, context);
    },
  });
};
