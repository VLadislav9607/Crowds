import { StyleSheet } from 'react-native';
import {
  AppFlashList,
  If,
  IPopupMenuItem,
  NoAccess,
  ScreenWrapper,
} from '@components';
import { useGetEventCheckedOutTalents, useGetMe } from '@actions';
import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import { TalentFlag } from '@modules/common';

import { EventParticipantCard, IEventParticipant } from '../../components';
import { formatCheckinTime } from '../CheckedInTalents/utils';

export const CheckedOutTalentsScreen = () => {
  const { organizationMember } = useGetMe();
  const hasAccess =
    !!organizationMember?.current_context?.capabilitiesAccess.manage_checkins;

  const { params } = useScreenNavigation<Screens.CheckedOutTalents>();
  const eventId = params?.eventId ?? '';

  const { data, isLoading } = useGetEventCheckedOutTalents(eventId);

  const participants: IEventParticipant[] = (data ?? []).map(item => ({
    id: item.participationId,
    talentId: item.talentId,
    name: item.name,
    location: item.location,
    status: 'checked_out' as const,
    time: formatCheckinTime(item.checked_out_time),
    flag: (item.flag as TalentFlag) ?? TalentFlag.GREEN,
    avatarPath: item.avatar_url,
    avatarBucket: 'talents_avatars' as const,
  }));

  const handleMenuSelect = (talentId: string) => (item: IPopupMenuItem) => {
    if (item.value === 'add_flag') {
      goToScreen(Screens.FlagParticipant, { talentId, eventId });
    }
  };

  const renderItem = ({ item }: { item: IEventParticipant }) => (
    <EventParticipantCard
      participant={item}
      onPress={() =>
        goToScreen(Screens.TalentProfile, { talentId: item.talentId })
      }
      onMenuSelect={handleMenuSelect(item.talentId)}
    />
  );

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title="Checked-Out Talents"
      showLoader={isLoading && hasAccess}
      contentContainerStyle={styles.contentContainer}
    >
      <If condition={hasAccess}>
        <AppFlashList
          data={participants}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingTop: 16 }}
          gap={0}
          emptyText="No checked-out talents found"
        />
      </If>
      <If condition={!hasAccess}>
        <NoAccess />
      </If>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
});
