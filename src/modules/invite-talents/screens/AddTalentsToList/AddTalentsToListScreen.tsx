import { StyleSheet, View } from 'react-native';

import { ScreenWrapper } from '@components';
import { SearchWithFilter } from '@ui';

import { TalentsList } from '../../components';
import { FilterTalentsModal } from '../../modals';
import { useTalentsForInvite } from '../../hooks';
import { Screens, useScreenNavigation } from '@navigation';

export const AddTalentsToListScreen = () => {
  const { params } = useScreenNavigation<Screens.AddTalentsToList>();

  const {
    search,
    setSearch,
    activeFiltersCount,
    filterModalRef,
    talentsForInviteList,
    handleOpenFilter,
  } = useTalentsForInvite(params?.listId ?? '');

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title="Add Talents to List"
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.content}>
        <SearchWithFilter
          searchValue={search}
          onSearchChange={setSearch}
          activeFiltersCount={activeFiltersCount}
          onFilterPress={handleOpenFilter}
        />

        <TalentsList
          data={talentsForInviteList}
          onPressRightAction={() => {}}
        />
      </View>

      <FilterTalentsModal bottomSheetRef={filterModalRef} />
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
