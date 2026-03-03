import { useMutation } from '@tanstack/react-query';
import { IMutationOptions, queryClient } from '@services';
import { showMutationErrorToast } from '@helpers';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { createConnectAccountAction } from './action';
import { CreateConnectAccountResDto } from './types';

export const useCreateConnectAccount = (
  options?: IMutationOptions<CreateConnectAccountResDto>,
) => {
  return useMutation({
    mutationFn: createConnectAccountAction,
    onError: (error: unknown) => showMutationErrorToast(error as Error),
    ...options,
    onSuccess: async (data, variables, res, context) => {
      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_CONNECT_ACCOUNT],
      });
      await options?.onSuccess?.(data, variables, res, context);
    },
  });
};
