import { useMutation } from '@tanstack/react-query';
import { createEventDraftAction } from './action';
import { IMutationOptions } from '@services';
import { CreateEventDraftResDto } from './types';

export const useCreateEventDraft = (
  options?: IMutationOptions<CreateEventDraftResDto>,
) => {
  return useMutation({
    mutationFn: createEventDraftAction,
    ...options,
  });
};
