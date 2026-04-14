import { useMutation } from '@tanstack/react-query';
import { updateCheckinOpensAtAction } from './action';
import { IMutationOptions, queryClient } from '@services';
import { UpdateCheckinOpensAtResDto } from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useUpdateCheckinOpensAt = (
  options?: IMutationOptions<UpdateCheckinOpensAtResDto>,
) => {
  return useMutation({
    mutationFn: updateCheckinOpensAtAction,
    ...options,
    onSuccess: async (data, variables, res, context) => {
      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_FOR_ORG_MEMBER],
      });
      await options?.onSuccess?.(data, variables, res, context);
    },
  });
};
