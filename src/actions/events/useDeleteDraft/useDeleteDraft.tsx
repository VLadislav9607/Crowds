import { useMutation } from '@tanstack/react-query';
import { deleteDraftEventAction } from './action';
import { IMutationOptions, queryClient } from '@services';
import { DeleteDraftEventResDto } from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useDeleteDraft = (
  options?: IMutationOptions<DeleteDraftEventResDto>,
) => {
  return useMutation({
    mutationFn: deleteDraftEventAction,
    ...options,
    onSuccess: async (data, variables, res, context) => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_ORG_EVENTS_COUNTERS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_ORG_EVENTS],
        }),
      ]);
      await options?.onSuccess?.(data, variables, res, context);
    },
  });
};
