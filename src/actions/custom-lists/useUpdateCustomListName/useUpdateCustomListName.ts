import { useMutation } from '@tanstack/react-query';
import { IMutationOptions, queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { showMutationErrorToast, showSuccessToast } from '@helpers';

import { updateCustomListNameAction } from './action';
import { UpdateCustomListNameBodyDto } from './types';

export const useUpdateCustomListName = (
  options?: IMutationOptions<void, unknown, UpdateCustomListNameBodyDto>,
) => {
  return useMutation({
    mutationFn: updateCustomListNameAction,
    ...options,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_CUSTOM_LISTS],
      });
      await options?.onSuccess?.(...args);
    },
    onError: showMutationErrorToast,
  });
};
