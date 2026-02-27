import { StyleSheet } from 'react-native';

import { AppFlashList, IPopupMenuItem, ScreenWrapper } from '@components';
import { useGetEventNoShowTalents } from '@actions';
import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import { TalentFlag } from '@modules/common';

import {
  EventParticipantCard,
  IEventParticipant,
} from '../../components';

export const NoShowTalentsScreen = () => {
  const { params } = useScreenNavigation<Screens.NoShowTalents>();
  const eventId = params?.eventId ?? '';

  const { data, isLoading } = useGetEventNoShowTalents(eventId);

  const participants: IEventParticipant[] = (data ?? []).map(item => ({
    id: item.participationId,
    name: item.name,
    location: item.location,
    status: 'no_show' as const,
    time: '',
    flag: (item.flag as TalentFlag) ?? TalentFlag.GREEN,
    avatarPath: item.avatar_url,
    avatarBucket: 'talents_avatars' as const,
  }));

  const handleMenuSelect = (talentId: string) => (item: IPopupMenuItem) => {
    if (item.value === 'add_flag') {
      goToScreen(Screens.FlagParticipant, { talentId, eventId });
    }
  };

  const renderItem = ({ item }: { item: IEventParticipant }) => {
    const talentDto = data?.find(d => d.participationId === item.id);

    return (
      <EventParticipantCard
        participant={item}
        onMenuSelect={
          talentDto ? handleMenuSelect(talentDto.talentId) : undefined
        }
      />
    );
  };

  return (
    <ScreenWrapper
      headerVariant="withTitle"
      title="No Show"
      showLoader={isLoading}
      contentContainerStyle={styles.contentContainer}
    >
      <AppFlashList
        data={participants}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: 16 }}
        gap={0}
        emptyText="No no-show talents found"
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
});
