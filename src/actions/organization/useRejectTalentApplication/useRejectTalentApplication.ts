import { useMutation } from '@tanstack/react-query';
import { rejectTalentApplicationAction } from './action';
import { IMutationOptions, queryClient } from '@services';
import { RejectTalentApplicationResDto } from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { showErrorToast, showSuccessToast } from '@helpers';

export const useRejectTalentApplication = (
  options?: IMutationOptions<RejectTalentApplicationResDto>,
) => {
  return useMutation({
    mutationFn: rejectTalentApplicationAction,
    ...options,
    onSuccess: async (data, variables, res, context) => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.EVENT_PARTICIPANTS_BY_STATUS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_PARTICIPANTS_COUNTS],
        }),
      ]);
      showSuccessToast('Application rejected successfully');
      await options?.onSuccess?.(data, variables, res, context);
    },
    onError: (error: any) => {
      showErrorToast(error?.message || 'Failed to reject application');
    },
  });
};
