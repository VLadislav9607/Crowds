import { useState } from 'react';

import { useInviteTalent } from '@actions';
import { showErrorToast, showSuccessToast } from '@helpers';

export const useSendInvite = () => {
  const [invitingTalentId, setInvitingTalentId] = useState<string | null>(null);

  const { mutate: inviteTalent } = useInviteTalent({
    onSuccess: () => {
      showSuccessToast('Invite sent successfully');
      setInvitingTalentId(null);
    },
    onError: error => {
      console.log('useInviteTalent', error);
      if (error instanceof Error) {
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
