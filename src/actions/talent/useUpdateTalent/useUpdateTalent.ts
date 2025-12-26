import { useMutation } from '@tanstack/react-query';
import { updateTalentAction } from './action';
import { IMutationOptions, queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { UpdateTalentRespDto } from './types';

export const useUpdateTalent = (
  options?: IMutationOptions<UpdateTalentRespDto>,
) => {
  return useMutation({
    mutationFn: updateTalentAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_ME],
      });
    },
    ...options,
  });
};
