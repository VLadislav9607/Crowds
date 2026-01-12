import { useMutation } from '@tanstack/react-query';
import { updateDraftEventAction } from './action';
import { IMutationOptions, queryClient } from '@services';
import { UpdateDraftEventResDto } from './types';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const useUpdateEventDraft = (
  options?: IMutationOptions<UpdateDraftEventResDto>,
) => {
  return useMutation({
    mutationFn: ({
      eventId,
      body,
    }: {
      eventId: string;
      body: Parameters<typeof updateDraftEventAction>[1];
    }) => updateDraftEventAction(eventId, body),
    ...options,
    onSuccess: async (data, variables, res, context) => {
      await Promise.allSettled([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_ORG_EVENTS_COUNTERS],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_ORG_EVENTS],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            TANSTACK_QUERY_KEYS.GET_EVENT_FOR_ORG_MEMBER,
            variables.eventId,
          ],
        }),
      ]);
      await options?.onSuccess?.(data, variables, res, context);
    },
  });
};
