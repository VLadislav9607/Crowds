import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { editMessageAction } from './action';

export const useEditMessage = (options?: IMutationOptions<void>) => {
  return useMutation({
    mutationFn: editMessageAction,
    ...options,
  });
};
