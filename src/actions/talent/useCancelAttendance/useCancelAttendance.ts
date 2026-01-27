import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';

import { cancelAttendanceAction } from './action';
import { CancelAttendanceResDto } from './types';
import { showMutationErrorToast } from '@helpers';

export const useCancelAttendance = (
  options?: IMutationOptions<CancelAttendanceResDto>,
) => {
  return useMutation({
    mutationFn: cancelAttendanceAction,
    onError: showMutationErrorToast,
    ...options,
  });
};
