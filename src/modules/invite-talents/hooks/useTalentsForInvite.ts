import { useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useGetInvitableTalents } from '@actions';
import { InvitedTalent } from '../types';
import { TalentFlag } from '@modules/common';

export const useTalentsForInvite = (eventId: string) => {
  const [search, setSearch] = useState('');
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const filterModalRef = useRef<BottomSheetModal<null>>(null);

  const {
    data: talentsForInviteResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInvitableTalents(eventId);

  const talentsForInviteList = useMemo<InvitedTalent[]>(() => {
    if (!talentsForInviteResponse) return [];
    return talentsForInviteResponse.pages.flatMap(page =>
      page.data.map(talent => ({
        id: talent.id,
        name: `${talent.first_name} ${talent.last_name}`.trim(),
        location: `${talent.location.city}, ${talent.location.country}`,
        avatarUrl: talent.avatar_path,
        flag: TalentFlag.GREEN, // Default flag, can be updated based on business logic
      })),
    );
  }, [talentsForInviteResponse]);

  const handleOpenFilter = () => {
    filterModalRef.current?.present();
  };

  const handleEndReached = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  return {
    search,
    setSearch,
    activeFiltersCount,
    setActiveFiltersCount,
    filterModalRef,
    handleOpenFilter,
    talentsForInviteList,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    handleEndReached,
  };
};
