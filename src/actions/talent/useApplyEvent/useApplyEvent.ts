import { useMutation } from '@tanstack/react-query';
import { applyEventAction } from './action';
import { IMutationOptions } from '@services';
import { ApplyEventResDto } from './types';

export const useApplyEvent = (options?: IMutationOptions<ApplyEventResDto>) => {
  return useMutation({
    mutationFn: applyEventAction,
    ...options,
  });
};
