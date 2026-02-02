import { useMutation } from '@tanstack/react-query';
import { removeEventFromEventsFolderAction } from './action';
import { RemoveEventFromEventsFolderResDto } from './types';
import { IMutationOptions } from '@services';

export const useRemoveEventFromEventsFolder = (
  options?: IMutationOptions<RemoveEventFromEventsFolderResDto>,
) => {
  return useMutation({
    mutationFn: removeEventFromEventsFolderAction,
    ...options,
  });
};
