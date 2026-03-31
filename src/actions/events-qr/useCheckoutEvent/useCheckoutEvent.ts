import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { checkoutEventAction } from './action';
import { CheckoutEventResDto } from './types';
import { IMutationOptions } from '@services';

export const useCheckoutEvent = (
  options?: IMutationOptions<CheckoutEventResDto>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkoutEventAction,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_DETAILS_FOR_TALENT],
      });
      options?.onSuccess?.(...args);
    },
  });
};
