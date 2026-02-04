import { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { If, ScreenWithScrollWrapper } from '@components';
import { ActionPurpleButton, AppButton, ChatButton } from '@ui';
import { COLORS } from '@styles';
import { Screens, useScreenNavigation, goToScreen } from '@navigation';
import { ICONS } from '@assets';
import { useGetMe, useGetGroupChatId, ChatType } from '@actions';
import { useCreateChatAndNavigate } from '@modules/common';

import {
  EventDetailsCardWithMap,
  EventDetailsTextBlock,
  EventDetailsRequirements,
  EventDetailsTags,
  EventHeaderElement,
} from '../../../components';
import { CancelEventAttendanceModal } from '../../modals';
import { styles } from './styles';

export const TalentEventDetailsScreen = () => {
  const insets = useSafeAreaInsets();
  const { params } = useScreenNavigation<Screens.TalentEventDetails>();
  const { me } = useGetMe();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const eventName = 'Fun Live Stage';

  const { mutate: getGroupChatId, isPending: isGettingGroupChatId } =
    useGetGroupChatId({
      onSuccess: data => {
        goToScreen(Screens.ChatRoom, {
          chatId: data,
          chatType: ChatType.Group,
          title: 'Group',
          imageUrl: '',
        });
      },
    });

  const { openChat, isPending: isCreatingChat } = useCreateChatAndNavigate();

  const handleChatWithOrganizer = () => {
    openChat({
      eventId: params?.eventId ?? '',
      talentId: me?.id ?? '',
      title: 'Organizer',
      imageUrl: '',
    });
  };

  const handleChatWithGroup = () => {
    getGroupChatId(params?.eventId ?? '');
  };

  const isLoading = false;

  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitleAndImageBg"
      headerStyles={styles.header}
      contentContainerStyle={{ paddingBottom: insets.bottom || 24 }}
      customElement={<EventHeaderElement />}
      rightIcons={[
        { icon: () => ICONS.bell('white'), onPress: () => {}, size: 20 },
      ]}
    >
      <View style={styles.container}>
        {/* <EventDetailsTextBlock
          label="Description"
          text="This event is based on Australia for an live music concert. Please make sure that you arrive at or before the time specified below. Once you have arrived, please proceed to the check in area, click check in below and follow the prompts."
          showSkeleton={isLoading}
        /> */}

        <EventDetailsCardWithMap
          location={{
            latitude: -37.8136,
            longitude: 144.9631,
            formatted_address: '333 Bridge Road, Richmond VIC Australia',
          }}
          startAtFormatted="03 OCT, 2025"
          duration="8:30 PM"
          showSkeleton={isLoading}
        />

        <EventDetailsRequirements
          requirements={[
            { title: 'Gender Required', options: ['Male'] },
            {
              title: 'People Required',
              options: ['30 Adults upto 29 years of age'],
            },
            { title: 'Industry', options: ['Reality Television'] },
          ]}
          showSkeleton={isLoading}
        />

        <EventDetailsTags
          tags={['Tag 1', 'Tag 2', 'Tag 3']}
          showSkeleton={isLoading}
        />

        <EventDetailsTextBlock
          label="Additional Details/Notes"
          text="Full details including times will be sent to your Crowds Now inbox no earlier than 24 hours prior to filming."
          showSkeleton={isLoading}
        />

        <If condition={!isLoading}>
          <>
            <ActionPurpleButton
              icon={ICONS.calendarEvent('main')}
              title="ADD EVENT TO MY CALENDER"
            />

            <View style={styles.chatButtonsContainer}>
              <ChatButton
                isLoading={isCreatingChat}
                style={styles.chatButton}
                topText="CHAT WITH"
                bottomText="ORGANIZER"
                onPress={handleChatWithOrganizer}
              />
              <ChatButton
                style={styles.chatButton}
                topText="CHAT IN"
                isLoading={isGettingGroupChatId}
                bottomText="GROUP"
                onPress={handleChatWithGroup}
              />
            </View>

            <ActionPurpleButton
              icon={ICONS.upload('main')}
              titleIcon={ICONS.paperClip('main')}
              title="DOWNLOAD ATTACHED PDF"
            />
          </>

          <AppButton
            onPress={() => setIsOpenModal(true)}
            title="Cancel attendance"
            variant="withBorder"
            wrapperStyles={{ borderColor: COLORS.red }}
            titleStyles={{ color: COLORS.red }}
          />
        </If>
      </View>

      <CancelEventAttendanceModal
        eventName={eventName}
        participationId={params?.participationId ?? ''}
        isVisible={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </ScreenWithScrollWrapper>
  );
};
