import { useMutation } from '@tanstack/react-query';
import { createPublishedEventAction } from './action';
import { IMutationOptions } from '@services';
import { CreatePublishedEventResDto } from './types';

export const useCreatePublishedEvent = (
  options?: IMutationOptions<CreatePublishedEventResDto>,
) => {
  return useMutation({
    mutationFn: createPublishedEventAction,
    ...options,
  });
};
