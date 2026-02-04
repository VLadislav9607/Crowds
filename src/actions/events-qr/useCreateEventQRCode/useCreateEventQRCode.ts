import { useMutation } from '@tanstack/react-query';
import { createEventQRCodeAction } from './action';
import { CreateEventQRCodeResDto } from './types';
import { IMutationOptions, queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useCreateEventQRCode = (
  options?: IMutationOptions<CreateEventQRCodeResDto>,
) => {
  return useMutation({
    mutationFn: createEventQRCodeAction,
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
            TANSTACK_QUERY_KEYS.GET_EVENT_FOR_ORG_MEMBER,
            variables.event_id,
          ],
        }),
      ]);
      await options?.onSuccess?.(data, variables, res, context);
    },
  });
};
