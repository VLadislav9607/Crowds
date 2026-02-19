import { useMutation } from '@tanstack/react-query';
import { checkoutEventAction } from './action';
import { CheckoutEventResDto } from './types';
import { IMutationOptions } from '@services';

export const useCheckoutEvent = (
  options?: IMutationOptions<CheckoutEventResDto>,
) => {
  return useMutation({
    mutationFn: checkoutEventAction,
    ...options,
  });
};
