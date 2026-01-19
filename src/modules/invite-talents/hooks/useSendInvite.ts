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
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_QUERY_KEYS.GET_INVITABLE_TALENTS, variables.eventId],
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
