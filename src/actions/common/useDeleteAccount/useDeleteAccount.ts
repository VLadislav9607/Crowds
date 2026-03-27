import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { deleteAccountAction } from './action';

export const useDeleteAccount = (options?: IMutationOptions<void>) => {
  return useMutation({
    mutationFn: deleteAccountAction,
    ...options,
  });
};
