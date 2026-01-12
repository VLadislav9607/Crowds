import { useMutation } from '@tanstack/react-query';
import { publishDraftEventAction } from './action';
import { IMutationOptions, queryClient } from '@services';
import { PublishDraftEventResDto } from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const usePublishEventDraft = (
  options?: IMutationOptions<PublishDraftEventResDto>,
) => {
  return useMutation({
    mutationFn: publishDraftEventAction,
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
