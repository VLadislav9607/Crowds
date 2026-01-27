import { StyleSheet, View } from 'react-native';

import { ScreenWrapper } from '@components';
import { SearchWithFilter } from '@ui';
import { Screens, useScreenNavigation } from '@navigation';

import { AddTalentsList } from '../../components';
import { FilterTalentsModal } from '../../modals';
import { useTalentsForCustomList, useAddTalentToCustomList } from '../../hooks';

export const AddTalentsToListScreen = () => {
  const { params } = useScreenNavigation<Screens.AddTalentsToList>();
  const eventId = params?.eventId ?? '';
  const listId = params?.listId ?? '';
  const listName = params?.listName ?? '';

  const {
    search,
    setSearch,
    activeFiltersCount,
    filterModalRef,
    talentsForInviteList,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    handleOpenFilter,
    handleApplyFilters,
    filters,
    handleEndReached,
  } = useTalentsForCustomList(eventId, listId);

  const { addingTalentId, handleAddTalent } = useAddTalentToCustomList(
    eventId,
    listId,
  );

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title={`Add to ${listName}`}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.content}>
        <SearchWithFilter
          hideFilterButton
          searchValue={search}
          onSearchChange={setSearch}
          activeFiltersCount={activeFiltersCount}
          onFilterPress={handleOpenFilter}
        />

        <AddTalentsList
          data={talentsForInviteList}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          actionTalentId={addingTalentId}
          onEndReached={handleEndReached}
          onPressRightAction={handleAddTalent}
        />
      </View>

      <FilterTalentsModal
        bottomSheetRef={filterModalRef}
        onApplyFilters={handleApplyFilters}
        initialFilters={filters}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    gap: 14,
    marginTop: 20,
  },
});
