import { useMutation } from '@tanstack/react-query';
import { updateCheckinCutoffAction } from './action';
import { IMutationOptions, queryClient } from '@services';
import { UpdateCheckinCutoffResDto } from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useUpdateCheckinCutoff = (
  options?: IMutationOptions<UpdateCheckinCutoffResDto>,
) => {
  return useMutation({
    mutationFn: updateCheckinCutoffAction,
    ...options,
    onSuccess: async (data, variables, res, context) => {
      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_FOR_ORG_MEMBER],
      });
      await options?.onSuccess?.(data, variables, res, context);
    },
  });
};
