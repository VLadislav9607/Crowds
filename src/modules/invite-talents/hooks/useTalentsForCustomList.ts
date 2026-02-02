import { useMemo, useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { CustomListTalentDto, useCustomListInvitableTalents } from '@actions';
import { useDebounce } from '@hooks';
import { AddTalentItem } from '../components/AddTalentsList/types';
import { mapInviteTalent } from '../helpers';

export const useTalentsForCustomList = (eventId: string, listId: string) => {
  const [search, setSearch] = useState('');
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const filterModalRef = useRef<BottomSheetModal<null>>(null);
  const debouncedSearch = useDebounce(search, 400);

  const {
    data: talentsResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useCustomListInvitableTalents({
    eventId,
    listId,
    search: debouncedSearch,
  });

  const talentsForInviteList = useMemo<AddTalentItem[]>(() => {
    if (!talentsResponse) return [];
    return talentsResponse.pages.flatMap(page =>
      page.data.map((talent: CustomListTalentDto) => ({
        ...mapInviteTalent(talent),
        isInList: talent.is_in_list,
      })),
    );
  }, [talentsResponse]);

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
