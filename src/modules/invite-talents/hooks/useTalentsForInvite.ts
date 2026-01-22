import { useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useGetInvitableTalents } from '@actions';
import { IEventParticipant } from '@modules/common';
import { useDebounce } from '@hooks';

import { mapInviteTalent } from '../helpers';

export const useTalentsForInvite = (eventId: string) => {
  const [search, setSearch] = useState('');
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const filterModalRef = useRef<BottomSheetModal<null>>(null);
  const debouncedSearch = useDebounce(search, 400);
  
  const {
    data: talentsForInviteResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInvitableTalents({ eventId, search: debouncedSearch });

  const talentsForInviteList = useMemo<IEventParticipant[]>(() => {
    if (!talentsForInviteResponse) return [];
    return talentsForInviteResponse.pages.flatMap(page =>
      page.data.map(talent => mapInviteTalent(talent)),
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
