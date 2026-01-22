import { useState } from 'react';
import { useInviteTalent } from '@actions';
import { showErrorToast, showSuccessToast } from '@helpers';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { queryClient } from '@services';

export const useSendInvite = () => {
  const [invitingTalentId, setInvitingTalentId] = useState<string | null>(null);

  const { mutate: inviteTalent } = useInviteTalent({
    onSuccess: async (_, variables: any) => {
      showSuccessToast('Invite sent successfully');
      setInvitingTalentId(null);

      await Promise.allSettled([
        // Invalidate all invitable talents queries for this event (with all search variations)
        queryClient.invalidateQueries({
          queryKey: [
            TANSTACK_QUERY_KEYS.GET_INVITABLE_TALENTS,
            variables.eventId,
          ],
        }),

        // Invalidate matching talents queries for this event (with all search variations)
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_MATCHING_TALENTS],
          predicate: query => {
            try {
              const params = JSON.parse(query.queryKey[1] as string);
              return params.eventId === variables.eventId;
            } catch {
              return false;
            }
          },
        }),

        // Invalidate custom list talents queries for this event (to update status)
        queryClient.invalidateQueries({
          queryKey: [
            TANSTACK_QUERY_KEYS.GET_CUSTOM_LISTS,
            'talents',
          ],
          predicate: query => {
            // Match queries that have eventId as the third element
            return (
              query.queryKey[0] === TANSTACK_QUERY_KEYS.GET_CUSTOM_LISTS &&
              query.queryKey[1] === 'talents' &&
              query.queryKey[2] === variables.eventId
            );
          },
        }),

        // Invalidate event participants counts to update invited count
        queryClient.invalidateQueries({
          queryKey: [
            TANSTACK_QUERY_KEYS.GET_EVENT_PARTICIPANTS_COUNTS,
            variables.eventId,
          ],
        }),

        // Invalidate event participants by status to update invited count
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.EVENT_PARTICIPANTS_BY_STATUS],
        }),
      ]);
    },
    onError: error => {
      if (error?.message) {
        showErrorToast(error.message);
      }
      setInvitingTalentId(null);
    },
  });

  return {
    invitingTalentId,
    setInvitingTalentId,
    inviteTalent,
  };
};
