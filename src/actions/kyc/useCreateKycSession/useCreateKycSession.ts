import { useMutation } from '@tanstack/react-query';
import { createKycSessionAction } from './action';
import { IMutationOptions } from '@services';
import { CreateKycSessionRespDto } from './types';

export const useCreateKycSession = (
  options?: IMutationOptions<CreateKycSessionRespDto>,
) => {
  return useMutation({
    mutationFn: createKycSessionAction,
    ...options,
  });
};
