import { useMutation } from '@tanstack/react-query';
import { createKycChecksAction } from './action';

export const useCreateKycChecks = () => {
  return useMutation({
    mutationFn: createKycChecksAction,
  });
};
