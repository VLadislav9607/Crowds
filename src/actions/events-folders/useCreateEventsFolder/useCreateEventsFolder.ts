import { useMutation } from '@tanstack/react-query';
import { createEventsFolderAction } from './action';
import { CreateEventsFolderResDto } from './types';
import { IMutationOptions, queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { showSuccessToast } from '@helpers';

export const useCreateEventsFolder = (
  options?: IMutationOptions<CreateEventsFolderResDto>,
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
      showSuccessToast('Folder created successfully');
    },
  });
};
