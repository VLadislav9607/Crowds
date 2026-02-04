import { useMutation } from '@tanstack/react-query';
import { editEventQRCodeAction } from './action';
import { CreateEventQRCodeResDto } from './types';
import { IMutationOptions, queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useEditEventQRCode = (
  options?: IMutationOptions<CreateEventQRCodeResDto>,
) => {
  return useMutation({
    mutationFn: editEventQRCodeAction,
    ...options,
    onSuccess: async (data, variables, res, context) => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [
            TANSTACK_QUERY_KEYS.GET_EVENT_QR_CODES,
            variables.event_id,
          ],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            TANSTACK_QUERY_KEYS.GET_EVENT_QR_CODE_DETAILS,
            variables.qr_id,
          ],
        }),
      ]);
      await options?.onSuccess?.(data, variables, res, context);
    },
  });
};
