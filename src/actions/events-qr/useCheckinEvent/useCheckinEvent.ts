import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { checkinEventAction } from './action';
import { CheckinEventResDto } from './types';
import { IMutationOptions } from '@services';

export const useCheckinEvent = (
  options?: IMutationOptions<CheckinEventResDto>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkinEventAction,
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_DETAILS_FOR_TALENT],
      });
      options?.onSuccess?.(...args);
    },
  });
};
