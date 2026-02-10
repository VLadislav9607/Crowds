import { useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useGetMatchingTalents } from '@actions';
import { IEventParticipant, TalentFlag } from '@modules/common';
import { useDebounce } from '@hooks';

import { mapInviteTalent } from '../helpers';
import { FilterMatchingTalentsState } from '../modals';

export const useMatchingTalentsForInvite = (eventId: string) => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterMatchingTalentsState>({
    distance: 100,
  });
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const filterModalRef = useRef<BottomSheetModal<null>>(null);
  const debouncedSearch = useDebounce(search, 400);

  const {
    data: matchingTalentsResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetMatchingTalents({
    eventId,
    search: debouncedSearch || undefined,
    distance: filters.distance,
  });

  const talentsForInviteList = useMemo<IEventParticipant[]>(() => {
    if (!matchingTalentsResponse?.data) return [];
    return matchingTalentsResponse.data.map(talent =>
      mapInviteTalent(talent, talent.flag as TalentFlag),
    );
  }, [matchingTalentsResponse]);

  const handleOpenFilter = () => {
    filterModalRef.current?.present();
  };

  const handleApplyFilters = (appliedFilters: FilterMatchingTalentsState) => {
    setFilters(appliedFilters);
    setActiveFiltersCount(1);
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
    handleApplyFilters,
    filters,
    talentsForInviteList,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    handleEndReached,
  };
};
