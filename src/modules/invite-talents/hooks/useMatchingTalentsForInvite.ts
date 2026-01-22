import { useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useGetMatchingTalents } from '@actions';
import { IEventParticipant } from '@modules/common';
import { useDebounce } from '@hooks';

import { mapInviteTalent } from '../helpers';
import { FiltersState } from '../modals';

export const useMatchingTalentsForInvite = (eventId: string) => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FiltersState>({});
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
    ...(filters.distance?.max && filters.distance.max !== 100
      ? { distance: filters.distance.max }
      : {}),
  });

  const talentsForInviteList = useMemo<IEventParticipant[]>(() => {
    if (!matchingTalentsResponse?.data) return [];
    return matchingTalentsResponse.data.map(talent =>
      mapInviteTalent(talent),
    );
  }, [matchingTalentsResponse]);

  const handleOpenFilter = () => {
    filterModalRef.current?.present();
  };

  const handleApplyFilters = (appliedFilters: FiltersState) => {
    setFilters(appliedFilters);
    // Calculate active filters count (excluding default values)
    const count = Object.keys(appliedFilters).filter(key => {
      const value = appliedFilters[key as keyof FiltersState];

      if (key === 'distance') {
        return (value as { min: number; max: number }).min !== 1 || (value as { min: number; max: number }).max !== 100;
      }

      if (key === 'weight') {
        return value !== 60;
      }
      if (key === 'height') {
        return value !== 5;
      }
      return value !== undefined && value !== null;
    }).length;

    setActiveFiltersCount(count);
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
