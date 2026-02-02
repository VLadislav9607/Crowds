import { useMutation } from '@tanstack/react-query';
import { IMutationOptions, queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { showMutationErrorToast, showSuccessToast } from '@helpers';

import { CreateCustomListResDto } from './types';
import { createCustomListAction } from './action';

export const useCreateCustomList = (
  options?: IMutationOptions<CreateCustomListResDto>,
) => {
  return useMutation({
    mutationFn: createCustomListAction,
    ...options,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_CUSTOM_LISTS],
      });
      setTimeout(() => {
        showSuccessToast('List created successfully');
      }, 1000);
      await options?.onSuccess?.(...args);
    },
    onError: showMutationErrorToast,
  });
};
