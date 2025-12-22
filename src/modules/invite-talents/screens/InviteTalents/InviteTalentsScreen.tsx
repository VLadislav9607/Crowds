import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { AppTabSelector, If, ScreenWrapper } from '@components';
import { COLORS, TYPOGRAPHY } from '@styles';
import { AppText, SearchWithFilter } from '@ui';
import { TalentFlag } from '@modules/common';

import { TalentsList, MyCustomTalentsLists } from '../../components';
import { useTalentsFilter } from '../../hooks';
import { FilterTalentsModal } from '../../modals';

const MOCK_LISTS = [
  { id: '1', listName: 'List 1', countTalents: 123 },
  { id: '2', listName: 'List 2', countTalents: 0 },
  { id: '3', listName: 'List 3', countTalents: 12 },
];

const MOCK_TALENTS = [
  {
    id: '1',
    name: 'Talent 1',
    location: 'Location 1',
    flag: TalentFlag.GREEN,
    avatarUrl:
      'https://images.unsplash.com/photo-1765734208128-b3c05bc25204?q=80&w=830&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    name: 'Talent 2',
    location: 'Location 2',
    flag: TalentFlag.RED,
    avatarUrl:
      'https://images.unsplash.com/photo-1765734208128-b3c05bc25204?q=80&w=830&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    name: 'Talent 3',
    location: 'Location 3',
    flag: TalentFlag.YELLOW,
    avatarUrl:
      'https://images.unsplash.com/photo-1765734208128-b3c05bc25204?q=80&w=830&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const InviteTalentsScreen = () => {
  const [selectedTab, setSelectedTab] = useState('my_lists');

  const {
    search,
    setSearch,
    activeFiltersCount,
    filterModalRef,
    handleOpenFilter,
    filteredTalents,
  } = useTalentsFilter(MOCK_TALENTS);

  const tabOptions = [
    { label: 'My lists', value: 'my_lists' },
    { label: 'Matching talent', value: 'matching_talent' },
    { label: 'All talent', value: 'all_talent' },
  ];

  const showTalentsList =
    selectedTab === 'matching_talent' || selectedTab === 'all_talent';

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      headerStyles={styles.headerStyles}
      contentContainerStyle={styles.contentContainer}
      title="Invite Talents"
      customElement={<AppText style={styles.invitedText}>0 invited</AppText>}
    >
      <AppTabSelector
        options={tabOptions}
        selectedValue={selectedTab}
        onSelect={setSelectedTab}
        marginBottom={0}
      />

      <If condition={selectedTab === 'my_lists'}>
        <MyCustomTalentsLists lists={MOCK_LISTS} />
      </If>

      <If condition={showTalentsList}>
        <SearchWithFilter
          searchValue={search}
          onSearchChange={setSearch}
          activeFiltersCount={activeFiltersCount}
          onFilterPress={handleOpenFilter}
        />
        <TalentsList data={filteredTalents} variant="invite" />
      </If>

      <FilterTalentsModal bottomSheetRef={filterModalRef} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerStyles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  invitedText: {
    position: 'absolute',
    right: 16,
    marginTop: 40,
    ...TYPOGRAPHY.semibold_16,
    color: COLORS.white,
  },
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
    gap: 14,
  },
});
