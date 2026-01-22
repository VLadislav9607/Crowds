import { useMutation } from '@tanstack/react-query';
import { renameEventsFolderAction } from './action';
import { RenameEventsFolderResDto } from './types';
import { IMutationOptions, queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { showSuccessToast } from '@helpers';

export const useRenameEventsFolder = (
  options?: IMutationOptions<RenameEventsFolderResDto>,
) => {
  return useMutation({
    mutationFn: renameEventsFolderAction,
    ...options,
    onSuccess: async (data, variables, res, context) => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENTS_FOLDERS],
        }),
      ]);
      await options?.onSuccess?.(data, variables, res, context);
      showSuccessToast('Folder renamed successfully');
    },
  });
};
