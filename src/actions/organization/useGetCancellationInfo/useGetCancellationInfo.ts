import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { showMutationErrorToast } from '@helpers';

import { getCancellationInfoAction } from './action';
import { CancellationInfoDto } from './types';

export const useGetCancellationInfo = (
  options?: IMutationOptions<CancellationInfoDto, unknown, string>,
) => {
  return useMutation({
    mutationFn: getCancellationInfoAction,
    onError: (error: unknown) => showMutationErrorToast(error as Error),
    ...options,
  });
};
