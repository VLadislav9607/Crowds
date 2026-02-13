import { StyleSheet, View } from 'react-native';
import { ScreenWrapper } from '@components';
import { SearchWithFilter } from '@ui';
import { Screens, useScreenNavigation } from '@navigation';

import { AddTalentsList } from '../../components';
import { useAddTalentToCustomList, useTalentsForCustomList } from '../../hooks';

export const AddTalentsToListScreen = () => {
  const { params } = useScreenNavigation<Screens.AddTalentsToList>();
  const listId = params?.listId ?? '';
  const listName = params?.listName ?? '';

  const {
    search,
    setSearch,
    talentsForInviteList,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    handleEndReached,
  } = useTalentsForCustomList(listId);

  const { addingTalentId, handleAddTalent } = useAddTalentToCustomList(listId);

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
          activeFiltersCount={0}
          onFilterPress={() => {}}
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
