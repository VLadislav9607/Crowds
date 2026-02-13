import { useMemo, useState } from 'react';
import { CustomListTalentDto, useCustomListInvitableTalents } from '@actions';
import { useDebounce } from '@hooks';

import { AddTalentItem } from '../components/AddTalentsList/types';
import { mapInviteTalent } from '../helpers';
import { TalentFlag } from '@modules/common';

export const useTalentsForCustomList = (listId: string) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const {
    data: talentsResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useCustomListInvitableTalents({
    listId,
    search: debouncedSearch,
  });

  const talentsForInviteList = useMemo<AddTalentItem[]>(() => {
    if (!talentsResponse) return [];
    return talentsResponse.pages.flatMap(page =>
      page.data.map((talent: CustomListTalentDto) => ({
        ...mapInviteTalent(talent, talent.flag as TalentFlag),
        isInList: talent.is_in_list,
      })),
    );
  }, [talentsResponse]);

  const handleEndReached = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  return {
    search,
    setSearch,
    talentsForInviteList,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    handleEndReached,
  };
};
