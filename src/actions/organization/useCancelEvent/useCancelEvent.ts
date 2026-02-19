import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { showMutationErrorToast } from '@helpers';

import { cancelEventAction } from './action';
import { CancelEventResDto } from './types';

export const useCancelEvent = (
  options?: IMutationOptions<CancelEventResDto>,
) => {
  return useMutation({
    mutationFn: cancelEventAction,
    onError: (error: unknown) => showMutationErrorToast(error as Error),
    ...options,
  });
};
