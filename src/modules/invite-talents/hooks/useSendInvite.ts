import { useState } from 'react';
import { useInviteTalent } from '@actions';
import { showErrorToast, showSuccessToast } from '@helpers';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { queryClient } from '@services';

export const useSendInvite = () => {
  const [invitingTalentId, setInvitingTalentId] = useState<string | null>(null);

  const { mutate: inviteTalent } = useInviteTalent({
    onSuccess: (data: any) => {
      showSuccessToast('Invite sent successfully');
      setInvitingTalentId(null);

      queryClient.setQueryData(
        [TANSTACK_QUERY_KEYS.GET_INVITABLE_TALENTS, data.eventId],
        (oldData: any) => {
          console.log('oldData', oldData);
          if (!oldData) return;

          // console.log('oldData', oldData.pages[0].data);
          // return oldData.pages[0].data.filter((talent: InvitableTalentDto) => {
          //   console.log('talent', talent);
          //   console.log('invitingTalentId', invitingTalentId);
          //   return talent.id !== invitingTalentId;
          // });
        },
      );
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
