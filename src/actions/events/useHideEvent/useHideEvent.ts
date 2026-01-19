import { useMutation } from '@tanstack/react-query';
import { hideEventAction } from './action';
import { IMutationOptions } from '@services';
import { HideEventResDto } from './types';

export const useHideEvent = (
  options?: IMutationOptions<HideEventResDto>,
) => {
  return useMutation({
    mutationFn: hideEventAction,
    ...options,
    onSuccess: async (data, variables, res, context) => {
      await options?.onSuccess?.(data, variables, res, context);
    },
  });
};
