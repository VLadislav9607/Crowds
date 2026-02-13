import { SearchWithFilter } from '@ui';
import { TalentsList } from '../TalentsList';
import { FilterMatchingTalentsModal } from '../../modals';
import { YellowFlagInviteWarningModal } from '../../../flags/modals';
import { useMatchingTalentsForInvite, useSendInvite } from '../../hooks';

interface MatchingTalentsTabProps {
  eventId: string;
}

export const MatchingTalentsTab = ({ eventId }: MatchingTalentsTabProps) => {
  const matchingTalentsHook = useMatchingTalentsForInvite(eventId);
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
        searchValue={matchingTalentsHook.search}
        onSearchChange={matchingTalentsHook.setSearch}
        activeFiltersCount={matchingTalentsHook.activeFiltersCount}
        onFilterPress={matchingTalentsHook.handleOpenFilter}
      />

      <TalentsList
        data={matchingTalentsHook.talentsForInviteList}
        isLoading={matchingTalentsHook.isLoading}
        onEndReached={matchingTalentsHook.handleEndReached}
        hasNextPage={matchingTalentsHook.hasNextPage}
        isFetchingNextPage={matchingTalentsHook.isFetchingNextPage}
        actionTalentId={invitingTalentId}
        onPressRightAction={talentId => handleInvite(eventId, talentId)}
      />

      <FilterMatchingTalentsModal
        bottomSheetRef={matchingTalentsHook.filterModalRef}
        onApplyFilters={matchingTalentsHook.handleApplyFilters}
        initialFilters={matchingTalentsHook.filters}
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
