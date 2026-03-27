import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { restoreAccountAction } from './action';

export const useRestoreAccount = (options?: IMutationOptions<void>) => {
  return useMutation({
    mutationFn: restoreAccountAction,
    ...options,
  });
};
