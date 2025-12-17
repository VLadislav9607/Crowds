import { StyleSheet, View } from 'react-native';

import { TalentFlag } from '@modules/common';
import { ScreenWrapper } from '@components';
import { SearchWithFilter } from '@ui';

import { TalentsList } from '../../components';
import { useTalentsFilter } from '../../hooks';
import { FilterTalentsModal } from '../../modals';

const MOCK_TALENTS = [
  {
    id: '1',
    name: 'Talent 1',
    location: 'Location 1',
    flag: TalentFlag.GREEN,
  },
  {
    id: '2',
    name: 'Talent 2',
    location: 'Location 2',
    flag: TalentFlag.RED,
  },
  {
    id: '3',
    name: 'Talent 3',
    location: 'Location 3',
    flag: TalentFlag.YELLOW,
  },
  {
    id: '4',
    name: 'Talent 4',
    location: 'Location 4',
    flag: TalentFlag.BLACK,
  },
];

export const AddTalentsToListScreen = () => {
  const {
    search,
    setSearch,
    activeFiltersCount,
    filterModalRef,
    handleOpenFilter,
    filteredTalents,
  } = useTalentsFilter(MOCK_TALENTS);

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
        <TalentsList data={filteredTalents} variant="add_to_list" />
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
