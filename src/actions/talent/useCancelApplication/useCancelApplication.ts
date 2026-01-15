import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';

import { cancelApplicationAction } from './action';
import { CancelApplicationResDto } from './types';

export const useCancelApplication = (
  options?: IMutationOptions<CancelApplicationResDto>,
) => {
  return useMutation({
    mutationFn: cancelApplicationAction,
    ...options,
  });
};
