import { useMutation } from '@tanstack/react-query';
import { IMutationOptions, queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { showMutationErrorToast, showSuccessToast } from '@helpers';

import { deleteCustomListAction } from './action';
import { DeleteCustomListBodyDto } from './types';

export const useDeleteCustomList = (
  options?: IMutationOptions<void, unknown, DeleteCustomListBodyDto>,
) => {
  return useMutation({
    mutationFn: deleteCustomListAction,
    ...options,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_CUSTOM_LISTS],
      });
      setTimeout(() => {
        showSuccessToast('List deleted successfully');
      }, 1000);
      await options?.onSuccess?.(...args);
    },
    onError: showMutationErrorToast,
  });
};
