import { useMemo } from 'react';
import { useCustomListMembers } from '@actions';
import { IEventParticipant } from '@modules/common';
import { mapInviteTalent } from '../helpers';

export const useCustomTalentsList = (eventId: string, listId: string) => {
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
        status: talent.status,
      })),
    );
  }, [talentsResponse]);

  const handleEndReached = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  const totalCount = talentsResponse?.pages[0]?.pagination?.total ?? 0;

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
