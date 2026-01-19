import { useState } from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { useInviteTalent, InvitableTalentsRespDto } from '@actions';
import { showErrorToast, showSuccessToast } from '@helpers';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { queryClient } from '@services';

export const useSendInvite = () => {
  const [invitingTalentId, setInvitingTalentId] = useState<string | null>(null);

  const { mutate: inviteTalent } = useInviteTalent({
    onSuccess: async (_, variables: any) => {
      showSuccessToast('Invite sent successfully');
      setInvitingTalentId(null);

      const queryKey = [
        TANSTACK_QUERY_KEYS.GET_INVITABLE_TALENTS,
        variables.eventId,
      ];

      queryClient.setQueryData<InfiniteData<InvitableTalentsRespDto>>(
        queryKey,
        existing => {
          if (!existing) return existing;

          const updatedPages = existing.pages.map(page => ({
            ...page,
            data: page.data.filter(talent => talent.id !== variables.talentId),
            pagination: {
              ...page.pagination,
              total: page.pagination.total - 1,
            },
          }));

          return {
            ...existing,
            pages: updatedPages,
          };
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
