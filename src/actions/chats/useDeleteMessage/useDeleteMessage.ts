import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { deleteMessageAction } from './action';

export const useDeleteMessage = (options?: IMutationOptions<void>) => {
  return useMutation({
    mutationFn: deleteMessageAction,
    ...options,
  });
};
