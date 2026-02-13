import { useState, useCallback } from 'react';
import { useInviteTalent, useGetActiveFlagForTarget } from '@actions';
import { showErrorToast, showSuccessToast } from '@helpers';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { queryClient } from '@services';
import type { ActiveFlagRow } from '@actions';

const TARGET_TYPE_TALENT = 'talent';

type YellowFlagModalState = {
  visible: true;
  flag: ActiveFlagRow;
  pendingInvite: { eventId: string; talentId: string };
} | null;

export const useSendInvite = () => {
  const [invitingTalentId, setInvitingTalentId] = useState<string | null>(null);
  const [yellowFlagModal, setYellowFlagModal] =
    useState<YellowFlagModalState>(null);

  const { mutateAsync: getActiveFlagForTarget, isPending: isCheckingFlag } =
    useGetActiveFlagForTarget();

  const { mutate: inviteTalent } = useInviteTalent({
    onSuccess: async (_, variables: any) => {
      showSuccessToast('Invite sent successfully');
      setInvitingTalentId(null);

      await Promise.allSettled([
        // Invalidate all invitable talents queries for this event (with all search variations)
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_ALL_TALENTS, variables.eventId],
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

        // Invalidate custom list talents queries for this event (all lists)
        queryClient.invalidateQueries({
          predicate: query =>
            query.queryKey[0] === TANSTACK_QUERY_KEYS.GET_CUSTOM_LIST_TALENTS &&
            query.queryKey[1] === variables.eventId,
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

  const handleInvite = useCallback(
    async (eventId: string, talentId: string) => {
      if (isCheckingFlag) return;

      try {
        const flag = await getActiveFlagForTarget({
          targetType: TARGET_TYPE_TALENT,
          targetId: talentId,
        });
        if (flag?.status === 'yellow') {
          setYellowFlagModal({
            visible: true,
            flag,
            pendingInvite: { eventId, talentId },
          });
          return;
        }
        setInvitingTalentId(talentId);
        inviteTalent({ eventId, talentId });
      } catch {
        setInvitingTalentId(talentId);
        inviteTalent({ eventId, talentId });
      }
    },
    [getActiveFlagForTarget, inviteTalent, isCheckingFlag],
  );

  const closeYellowFlagModal = useCallback(() => {
    setYellowFlagModal(null);
  }, []);

  const confirmYellowFlagModal = useCallback(() => {
    if (yellowFlagModal?.visible && yellowFlagModal.pendingInvite) {
      const { eventId, talentId } = yellowFlagModal.pendingInvite;
      setInvitingTalentId(talentId);
      inviteTalent({ eventId, talentId });
      setYellowFlagModal(null);
    }
  }, [yellowFlagModal, inviteTalent]);

  return {
    invitingTalentId,
    setInvitingTalentId,
    inviteTalent,
    handleInvite,
    yellowFlagModal,
    closeYellowFlagModal,
    confirmYellowFlagModal,
  };
};
