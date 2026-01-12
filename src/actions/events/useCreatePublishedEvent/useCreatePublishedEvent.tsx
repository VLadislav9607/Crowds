import { useMutation } from '@tanstack/react-query';
import { createPublishedEventAction } from './action';
import { IMutationOptions, queryClient } from '@services';
import { CreatePublishedEventResDto } from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useCreatePublishedEvent = (
  options?: IMutationOptions<CreatePublishedEventResDto>,
) => {
  return useMutation({
    mutationFn: createPublishedEventAction,
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
