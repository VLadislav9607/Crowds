import { useMutation } from '@tanstack/react-query';
import { toggleEventInEventsFolderAction } from './action';
import { ToggleEventInEventsFolderResDto } from './types';
import { IMutationOptions } from '@services';

export const useToggleEventInEventsFolder = (
  options?: IMutationOptions<ToggleEventInEventsFolderResDto>,
) => {
  return useMutation({
    mutationFn: toggleEventInEventsFolderAction,
    ...options,
  });
};
