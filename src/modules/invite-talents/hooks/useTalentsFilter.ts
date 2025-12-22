import { useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { InvitedTalent } from '../types';

export const useTalentsFilter = (talents: InvitedTalent[]) => {
  const [search, setSearch] = useState('');
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const filterModalRef = useRef<BottomSheetModal<null>>(null);

  const handleOpenFilter = () => {
    filterModalRef.current?.present();
  };

  const filteredTalents = talents.filter(talent =>
    talent.name.toLowerCase().includes(search.toLowerCase()),
  );

  return {
    search,
    setSearch,
    activeFiltersCount,
    setActiveFiltersCount,
    filterModalRef,
    handleOpenFilter,
    filteredTalents,
  };
};

