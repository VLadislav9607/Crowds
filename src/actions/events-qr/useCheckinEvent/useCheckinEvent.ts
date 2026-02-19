import { useMutation } from '@tanstack/react-query';
import { checkinEventAction } from './action';
import { CheckinEventResDto } from './types';
import { IMutationOptions } from '@services';

export const useCheckinEvent = (
  options?: IMutationOptions<CheckinEventResDto>,
) => {
  return useMutation({
    mutationFn: checkinEventAction,
    ...options,
  });
};
