import { useMutation } from '@tanstack/react-query';
import { updateTalentAction } from './action';
import { IMutationOptions, queryClient } from '@services';
import { UpdateTalentRespDto } from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useUpdateTalent = (
  options?: IMutationOptions<UpdateTalentRespDto>,
) => {
  return useMutation({
    mutationFn: updateTalentAction,
    ...options,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_ME],
      });
      await options?.onSuccess?.(...args);
    },
  });
};
