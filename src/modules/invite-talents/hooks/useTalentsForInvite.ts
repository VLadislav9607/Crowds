import { useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useGetInvitableTalents } from '@actions';
import { IEventParticipant } from '@modules/common';
import { useDebounce } from '@hooks';

import { mapInviteTalent } from '../helpers';
import { FiltersState } from '../modals';

export const useTalentsForInvite = (eventId: string) => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FiltersState>({ distance: 100 });
  const [activeFiltersCount, setActiveFiltersCount] = useState(1);
  const filterModalRef = useRef<BottomSheetModal<null>>(null);
  const debouncedSearch = useDebounce(search, 400);

  const {
    data: talentsForInviteResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInvitableTalents({
    eventId,
    search: debouncedSearch,
    filters,
  });

  const talentsForInviteList = useMemo<IEventParticipant[]>(() => {
    if (!talentsForInviteResponse) return [];
    return talentsForInviteResponse.pages.flatMap(page =>
      page.data.map(talent => mapInviteTalent(talent)),
    );
  }, [talentsForInviteResponse]);

  const handleOpenFilter = () => {
    filterModalRef.current?.present();
  };

  const handleApplyFilters = (appliedFilters: FiltersState) => {
    setFilters(appliedFilters);
    const activeCount = Object.keys(appliedFilters).filter(
      key => appliedFilters[key as keyof FiltersState] !== undefined,
    ).length;
    setActiveFiltersCount(activeCount);
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
