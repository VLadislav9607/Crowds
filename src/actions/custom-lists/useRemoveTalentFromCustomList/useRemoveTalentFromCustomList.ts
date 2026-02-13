import { useMutation } from '@tanstack/react-query';
import { IMutationOptions, queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { showMutationErrorToast, showSuccessToast } from '@helpers';

import { removeTalentFromCustomListAction } from './action';
import { RemoveTalentFromCustomListBodyDto } from './types';

export const useRemoveTalentFromCustomList = (
  listId?: string,
  options?: IMutationOptions<void, unknown, RemoveTalentFromCustomListBodyDto>,
) => {
  return useMutation({
    mutationFn: removeTalentFromCustomListAction,
    ...options,
    onSuccess: async (...args) => {
      const [, variables] = args;
      // Invalidate custom lists to update members count
      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_CUSTOM_LISTS],
      });

      // Invalidate custom list talents query for this event and list
      if (listId && variables.eventId) {
        await queryClient.invalidateQueries({
          queryKey: [
            TANSTACK_QUERY_KEYS.GET_CUSTOM_LIST_TALENTS,
            variables.eventId,
            listId,
          ],
        });
      }

      setTimeout(() => {
        showSuccessToast('Talent removed from list');
      }, 1000);
      await options?.onSuccess?.(...args);
    },
    onError: showMutationErrorToast,
  });
};
