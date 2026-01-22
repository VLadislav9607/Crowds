import { SearchWithFilter } from '@ui';
import { TalentsList } from '../TalentsList';
import { FilterTalentsModal } from '../../modals';
import { useTalentsForInvite, useSendInvite } from '../../hooks';

interface AllTalentsTabProps {
  eventId: string;
}

export const AllTalentsTab = ({ eventId }: AllTalentsTabProps) => {
  const allTalentsHook = useTalentsForInvite(eventId);
  const { invitingTalentId, setInvitingTalentId, inviteTalent } =
    useSendInvite();

  return (
    <>
      <SearchWithFilter
        searchValue={allTalentsHook.search}
        onSearchChange={allTalentsHook.setSearch}
        activeFiltersCount={allTalentsHook.activeFiltersCount}
        onFilterPress={allTalentsHook.handleOpenFilter}
      />

      <TalentsList
        data={allTalentsHook.talentsForInviteList}
        isLoading={allTalentsHook.isLoading}
        onEndReached={allTalentsHook.handleEndReached}
        hasNextPage={allTalentsHook.hasNextPage}
        isFetchingNextPage={allTalentsHook.isFetchingNextPage}
        actionTalentId={invitingTalentId}
        onPressRightAction={talentId => {
          setInvitingTalentId(talentId);
          inviteTalent({ eventId, talentId });
        }}
      />

      <FilterTalentsModal bottomSheetRef={allTalentsHook.filterModalRef} />
    </>
  );
};
