import { SearchWithFilter } from '@ui';
import { TalentsList } from '../TalentsList';
import { FilterTalentsModal } from '../../modals';
import { YellowFlagInviteWarningModal } from '../../../flags/modals';
import { useAllTalents, useSendInvite } from '../../hooks';

interface AllTalentsTabProps {
  eventId: string;
}

export const AllTalentsTab = ({ eventId }: AllTalentsTabProps) => {
  const allTalentsHook = useAllTalents(eventId);
  const {
    invitingTalentId,
    handleInvite,
    yellowFlagModal,
    closeYellowFlagModal,
    confirmYellowFlagModal,
  } = useSendInvite();

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
        onPressRightAction={talentId => handleInvite(eventId, talentId)}
      />

      <FilterTalentsModal
        bottomSheetRef={allTalentsHook.filterModalRef}
        onApplyFilters={allTalentsHook.handleApplyFilters}
        initialFilters={allTalentsHook.filters}
      />

      <YellowFlagInviteWarningModal
        isVisible={yellowFlagModal?.visible ?? false}
        flag={yellowFlagModal?.flag ?? null}
        onClose={closeYellowFlagModal}
        onConfirm={confirmYellowFlagModal}
        isInviting={!!invitingTalentId}
      />
    </>
  );
};
