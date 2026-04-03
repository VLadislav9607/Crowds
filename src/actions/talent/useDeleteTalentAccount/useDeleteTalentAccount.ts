import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { deleteTalentAccountAction } from './action';

export const useDeleteTalentAccount = (options?: IMutationOptions<void>) => {
  return useMutation({
    mutationFn: deleteTalentAccountAction,
    ...options,
  });
};
