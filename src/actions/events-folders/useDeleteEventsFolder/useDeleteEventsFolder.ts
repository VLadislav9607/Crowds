import { useMutation } from '@tanstack/react-query';
import { createEventsFolderAction } from './action';
import { DeleteEventsFolderResDto } from './types';
import { IMutationOptions, queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useDeleteEventsFolder = (
  options?: IMutationOptions<DeleteEventsFolderResDto>,
) => {
  return useMutation({
    mutationFn: createEventsFolderAction,
    ...options,
    onSuccess: async (data, variables, res, context) => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_FOLDERS],
        }),
      ]);
      await options?.onSuccess?.(data, variables, res, context);
    },
  });
};
