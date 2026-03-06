import { useMutation } from '@tanstack/react-query';
import { udateBrandAction } from './action';
import { IMutationOptions, queryClient } from '@services';
import { UpdateBrandRespDto } from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useUpdateBrand = (
  options?: IMutationOptions<UpdateBrandRespDto>,
) => {
  return useMutation({
    mutationFn: udateBrandAction,
    ...options,
    onSuccess: async (...args) => {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: [TANSTACK_QUERY_KEYS.MY_CHATS],
        }),
        queryClient.refetchQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_CHAT_PARTICIPANTS],
        }),
      ]);
      await options?.onSuccess?.(...args);
    },
  });
};
