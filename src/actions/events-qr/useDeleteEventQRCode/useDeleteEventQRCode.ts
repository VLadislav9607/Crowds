import { useMutation } from '@tanstack/react-query';
import { deleteEventQRCodeAction } from './action';
import { DeleteEventQRCodeResDto } from './types';
import { IMutationOptions, queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { showSuccessToast } from '@helpers';

export const useDeleteEventQRCode = (
  options?: IMutationOptions<DeleteEventQRCodeResDto>,
) => {
  return useMutation({
    mutationFn: deleteEventQRCodeAction,
    ...options,
    onSuccess: async (data, variables, res, context) => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [
            TANSTACK_QUERY_KEYS.GET_EVENT_QR_CODES,
            variables.event_id,
          ],
        }),
        queryClient.refetchQueries({
          queryKey: [
            TANSTACK_QUERY_KEYS.GET_EVENT_QR_CODES,
            variables.event_id,
          ],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            TANSTACK_QUERY_KEYS.GET_EVENT_FOR_ORG_MEMBER,
            variables.event_id,
          ],
        }),
      ]);
      await options?.onSuccess?.(data, variables, res, context);
      showSuccessToast('QR Code deleted successfully');
    },
  });
};
