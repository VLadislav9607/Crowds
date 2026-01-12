import { useMutation } from '@tanstack/react-query';
import { createEventDraftAction } from './action';
import { IMutationOptions, queryClient } from '@services';
import { CreateEventDraftResDto } from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useCreateEventDraft = (
  options?: IMutationOptions<CreateEventDraftResDto>,
) => {
  return useMutation({
    mutationFn: createEventDraftAction,
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
