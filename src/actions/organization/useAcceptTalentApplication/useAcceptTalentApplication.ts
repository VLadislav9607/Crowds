import { useMutation } from '@tanstack/react-query';
import { acceptTalentApplicationAction } from './action';
import { IMutationOptions, queryClient } from '@services';
import { AcceptTalentApplicationResDto } from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { showErrorToast, showSuccessToast } from '@helpers';

export const useAcceptTalentApplication = (
  options?: IMutationOptions<AcceptTalentApplicationResDto>,
) => {
  return useMutation({
    mutationFn: acceptTalentApplicationAction,
    ...options,
    onSuccess: async (data, variables, res, context) => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.EVENT_PARTICIPANTS_BY_STATUS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_PARTICIPANTS_COUNTS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_ORG_EVENTS],
        }),
      ]);
      showSuccessToast('Application accepted successfully');
      await options?.onSuccess?.(data, variables, res, context);
    },
    onError: (error: any) => {
      showErrorToast(error?.message || 'Failed to accept application');
    },
  });
};
