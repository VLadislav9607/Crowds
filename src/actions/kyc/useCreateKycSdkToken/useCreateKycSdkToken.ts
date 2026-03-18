import { useMutation } from '@tanstack/react-query';
import { createKycSdkTokenAction } from './action';
import { IMutationOptions } from '@services';
import { CreateKycSdkTokenRespDto } from './types';

export const useCreateKycSdkToken = (
  options?: IMutationOptions<CreateKycSdkTokenRespDto>,
) => {
  return useMutation({
    mutationFn: createKycSdkTokenAction,
    ...options,
  });
};
