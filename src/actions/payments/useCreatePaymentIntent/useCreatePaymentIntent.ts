import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { showMutationErrorToast } from '@helpers';
import { createPaymentIntentAction } from './action';
import { CreatePaymentIntentResDto } from './types';

export const useCreatePaymentIntent = (
  options?: IMutationOptions<CreatePaymentIntentResDto>,
) => {
  return useMutation({
    mutationFn: createPaymentIntentAction,
    onError: (error: unknown) => showMutationErrorToast(error as Error),
    ...options,
  });
};
