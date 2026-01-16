import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppTabSelector, If, ScreenWrapper } from '@components';
import { COLORS, TYPOGRAPHY } from '@styles';
import { AppText, SearchWithFilter } from '@ui';
import { Screens, useScreenNavigation } from '@navigation';

import { TalentsList, MyCustomTalentsLists } from '../../components';
import { useSendInvite, useTalentsForInvite } from '../../hooks';
import { FilterTalentsModal } from '../../modals';

export const InviteTalentsScreen = () => {
  const { params } = useScreenNavigation<Screens.InviteTalents>();

  const [selectedTab, setSelectedTab] = useState('my_lists');

  const {
    search,
    setSearch,
    activeFiltersCount,
    filterModalRef,
    handleOpenFilter,
    talentsForInviteList,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    handleEndReached,
  } = useTalentsForInvite(params?.eventId ?? '');

  const { invitingTalentId, setInvitingTalentId, inviteTalent } =
    useSendInvite();

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
        <MyCustomTalentsLists lists={[]} />
      </If>

      <If condition={showTalentsList}>
        <SearchWithFilter
          searchValue={search}
          onSearchChange={setSearch}
          activeFiltersCount={activeFiltersCount}
          onFilterPress={handleOpenFilter}
        />

        <TalentsList
          data={talentsForInviteList}
          isLoading={isLoading}
          onEndReached={handleEndReached}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isSendingInvite={invitingTalentId}
          onPressRightAction={talentId => {
            setInvitingTalentId(talentId);
            inviteTalent({ eventId: params?.eventId ?? '', talentId });
          }}
        />
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
