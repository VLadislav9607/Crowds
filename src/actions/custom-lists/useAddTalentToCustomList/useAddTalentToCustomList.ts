import { InfiniteData, useMutation } from '@tanstack/react-query';
import { IMutationOptions, queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { showMutationErrorToast, showSuccessToast } from '@helpers';
import { addTalentToCustomListAction } from './action';
import { GetCustomListTalentsRespDto } from '../useCustomListInvitableTalents/types';
import { AddTalentToCustomListBodyDto } from './types';

export const useAddTalentToCustomList = (
  eventId?: string,
  listId?: string,
  options?: IMutationOptions<void, unknown, AddTalentToCustomListBodyDto>,
) => {
  return useMutation<void, unknown, AddTalentToCustomListBodyDto>({
    mutationFn: addTalentToCustomListAction,
    ...options,
    onSuccess: async (data, variables, context) => {
      // Invalidate custom lists to update members count
      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_CUSTOM_LISTS],
      });

      // Invalidate custom list talents query (with all search variations)
      if (listId && eventId) {
        await queryClient.invalidateQueries({
          queryKey: [
            TANSTACK_QUERY_KEYS.GET_CUSTOM_LIST_TALENTS,
            eventId,
            'custom-list',
            listId,
          ],
        });
      }

      // Optimistically update invitable talents cache for all search variations
      if (eventId && listId && variables.p_talent_id) {
        // Get all queries that match the prefix (eventId, 'custom-list', listId)
        const queryCache = queryClient.getQueryCache();
        const matchingQueries = queryCache.findAll({
          queryKey: [
            TANSTACK_QUERY_KEYS.GET_CUSTOM_LIST_TALENTS,
            eventId,
            'custom-list',
            listId,
          ],
        });

        // Update each matching query
        matchingQueries.forEach(query => {
          queryClient.setQueryData<InfiniteData<GetCustomListTalentsRespDto>>(
            query.queryKey,
            oldData => {
              if (!oldData) return oldData;

              // Check if talent is already in list (shouldn't happen, but just in case)
              const talentAlreadyInList = oldData.pages.some(page =>
                page.data.some(
                  talent =>
                    talent.id === variables.p_talent_id && talent.is_in_list,
                ),
              );

              if (talentAlreadyInList) {
                return oldData;
              }

              // Update talent is_in_list flag and increment total
              const updatedTotal = oldData.pages[0]?.pagination.total
                ? oldData.pages[0].pagination.total + 1
                : 1;

              return {
                ...oldData,
                pages: oldData.pages.map(page => ({
                  ...page,
                  data: page.data.map(talent =>
                    talent.id === variables.p_talent_id
                      ? { ...talent, is_in_list: true }
                      : talent,
                  ),
                  pagination: {
                    ...page.pagination,
                    total: updatedTotal,
                  },
                })),
              };
            },
          );
        });
      }

      showSuccessToast('Talent added to list successfully');
      await options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      showMutationErrorToast(error);
      options?.onError?.(error, variables, context);
    },
  });
};
