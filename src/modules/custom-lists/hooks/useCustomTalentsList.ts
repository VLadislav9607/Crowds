import { useMemo } from 'react';
import { useCustomListMembers } from '@actions';
import { IEventParticipant, TalentFlag } from '@modules/common';
import { mapInviteTalent } from '../helpers';

export const useCustomTalentsList = (eventId: string | undefined, listId: string) => {
  const {
    data: talentsResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useCustomListMembers({ eventId, listId });

  const talentsList = useMemo<IEventParticipant[]>(() => {
    if (!talentsResponse) return [];
    return talentsResponse.pages.flatMap(page =>
      page.data.map(talent => ({
        ...mapInviteTalent(talent),
        status: talent.participation_status,
        flag: talent.flag as TalentFlag,
      })),
    );
  }, [talentsResponse]);

  const handleEndReached = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  const totalCount = talentsList.length;

  return {
    talentsList,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    handleEndReached,
    totalCount,
    hasTalents: talentsList.length > 0,
  };
};
