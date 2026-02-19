import { useMutation } from '@tanstack/react-query';
import { acceptEventNdaAction } from './action';
import { IMutationOptions } from '@services';

export const useAcceptEventNda = (options?: IMutationOptions<void>) => {
  return useMutation({
    mutationFn: acceptEventNdaAction,
    ...options,
    onSuccess: async (data, variables, context) => {
      await options?.onSuccess?.(data, variables, context);
    },
  });
};
