import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppTabSelector, If, ScreenWrapper } from '@components';
import { COLORS, TYPOGRAPHY } from '@styles';
import { AppText } from '@ui';
import { goBack, Screens, useScreenNavigation } from '@navigation';
import { useEventParticipantsCounts, useGetEventForOrgMember } from '@actions';

import { MyCustomTalentsLists } from '../../../custom-lists/components';
import { MatchingTalentsTab, AllTalentsTab } from '../../components';

export const InviteTalentsScreen = () => {
  const { params } = useScreenNavigation<Screens.InviteTalents>();
  const eventId = params?.eventId ?? '';

  const { invited } = useEventParticipantsCounts(eventId);
  const { data: eventData } = useGetEventForOrgMember({ event_id: eventId });

  const hasLocation = !!eventData?.event_location;

  const isRegistrationClosed = useMemo(() => {
    if (!eventData?.registration_closes_at) return false;
    return new Date(eventData.registration_closes_at) < new Date();
  }, [eventData?.registration_closes_at]);

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
      containerStyle={styles.noPaddingBottom}
      title="Invite Talents"
      goBackCallback={() => {
        goBack();
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

      <If condition={isRegistrationClosed}>
        <View style={styles.bannerContainer}>
          <AppText typography="regular_14" color="red">
            Registration is closed. Invitations are disabled.
          </AppText>
        </View>
      </If>

      <If condition={selectedTab === 'my_lists'}>
        <MyCustomTalentsLists eventId={eventId} />
      </If>

      <If condition={selectedTab === 'matching_talent'}>
        <MatchingTalentsTab eventId={eventId} hasLocation={hasLocation} isRegistrationClosed={isRegistrationClosed} />
      </If>

      <If condition={selectedTab === 'all_talent'}>
        <AllTalentsTab eventId={eventId} hasLocation={hasLocation} isRegistrationClosed={isRegistrationClosed} />
      </If>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  noPaddingBottom: {
    paddingBottom: 0,
  },
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
  bannerContainer: {
    backgroundColor: COLORS.red_light,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
});
