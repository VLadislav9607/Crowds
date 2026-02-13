import { useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useGetAllTalents } from '@actions';
import { IEventParticipant, TalentFlag } from '@modules/common';
import { useDebounce } from '@hooks';

import { mapInviteTalent } from '../helpers';
import { FiltersState } from '../modals';

export const useAllTalents = (eventId: string) => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FiltersState | null>(null);
  const [activeFiltersCount, setActiveFiltersCount] = useState(1);
  const filterModalRef = useRef<BottomSheetModal<null>>(null);
  const debouncedSearch = useDebounce(search, 400);

  const {
    data: talentsForInviteResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetAllTalents({
    eventId,
    search: debouncedSearch,
    filters,
  });

  const talentsForInviteList = useMemo<IEventParticipant[]>(() => {
    if (!talentsForInviteResponse) return [];
    return talentsForInviteResponse.pages.flatMap(page =>
      page.data.map(talent => ({
        ...mapInviteTalent(talent, talent.flag as TalentFlag),
        status: talent.participation_status ?? undefined,
      })),
    );
  }, [talentsForInviteResponse]);

  const handleOpenFilter = () => {
    filterModalRef.current?.present();
  };

  const handleApplyFilters = (appliedFilters: FiltersState | null) => {
    setFilters(appliedFilters);

    const activeCount = appliedFilters
      ? Object.keys(appliedFilters).filter(
          key => appliedFilters[key as keyof FiltersState] !== undefined,
        ).length
      : 0;

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
