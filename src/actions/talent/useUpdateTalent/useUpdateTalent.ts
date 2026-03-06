import { useMutation } from '@tanstack/react-query';
import { updateTalentAction } from './action';
import { IMutationOptions, queryClient } from '@services';
import { UpdateTalentRespDto } from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { showMutationErrorToast } from '@helpers';

export const useUpdateTalent = (
  options?: IMutationOptions<UpdateTalentRespDto>,
) => {
  return useMutation({
    mutationFn: updateTalentAction,
    ...options,
    onSuccess: async (...args) => {
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_ME],
        }),
        queryClient.refetchQueries({
          queryKey: [TANSTACK_QUERY_KEYS.MY_CHATS],
        }),
        queryClient.refetchQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_CHAT_PARTICIPANTS],
        }),
      ]);
      await options?.onSuccess?.(...args);
    },
    onError: showMutationErrorToast,
  });
};
