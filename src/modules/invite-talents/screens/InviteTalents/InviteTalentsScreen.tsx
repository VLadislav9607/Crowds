import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppTabSelector, If, ScreenWrapper } from '@components';
import { COLORS, TYPOGRAPHY } from '@styles';
import { AppText } from '@ui';
import { goBack, Screens, useScreenNavigation } from '@navigation';

import {
  MyCustomTalentsLists,
  MatchingTalentsTab,
  AllTalentsTab,
} from '../../components';
import { useEventParticipantsCounts } from '@actions';

export const InviteTalentsScreen = () => {
  const { params, navigation } = useScreenNavigation<Screens.InviteTalents>();
  const eventId = params?.eventId ?? '';

  const { invited } = useEventParticipantsCounts(eventId);

  const [selectedTab, setSelectedTab] = useState('my_lists');

  const tabOptions = [
    { label: 'My lists', value: 'my_lists' },
    { label: 'Matching talents', value: 'matching_talent' },
    { label: 'All talents', value: 'all_talent' },
  ];

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      headerStyles={styles.headerStyles}
      contentContainerStyle={styles.contentContainer}
      title="Invite Talents"
      goBackCallback={() => {
        if (params?.forwardFrom === Screens.CreateEvent) {
          navigation.pop(2);
        } else {
          goBack();
        }
      }}
      customElement={
        <AppText style={styles.invitedText}>{invited} invited</AppText>
      }
    >
      <AppTabSelector
        options={tabOptions}
        selectedValue={selectedTab}
        onSelect={setSelectedTab}
        marginBottom={0}
      />

      <If condition={selectedTab === 'my_lists'}>
        <MyCustomTalentsLists />
      </If>

      <If condition={selectedTab === 'matching_talent'}>
        <MatchingTalentsTab eventId={eventId} />
      </If>

      <If condition={selectedTab === 'all_talent'}>
        <AllTalentsTab eventId={eventId} />
      </If>
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
