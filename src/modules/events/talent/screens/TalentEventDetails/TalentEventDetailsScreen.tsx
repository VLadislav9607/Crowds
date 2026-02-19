import { useState } from 'react';
import { Alert, Linking, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { If, ScreenWithScrollWrapper } from '@components';
import { ActionPurpleButton, AppButton, ChatButton } from '@ui';
import { COLORS } from '@styles';
import { Screens, useScreenNavigation, goToScreen } from '@navigation';
import { ICONS } from '@assets';
import {
  useGetMe,
  useGetGroupChatId,
  ChatType,
  useGetEventDetailsForTalent,
} from '@actions';
import { useCreateChatAndNavigate } from '@modules/common';
import {
  getCountryNameByCode,
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from '@helpers';
import { formatInTimeZone } from 'date-fns-tz';
import RNCalendarEvents from 'react-native-calendar-events';
import { calculateEventDuration } from '../../../helpers';

import {
  EventDetailsCardWithMap,
  EventDetailsTextBlock,
  EventHeaderElement,
  EventGroupDetails,
} from '../../../components';
import { CancelEventAttendanceModal } from '../../modals';
import { styles } from './styles';

export const TalentEventDetailsScreen = () => {
  const insets = useSafeAreaInsets();
  const { params } = useScreenNavigation<Screens.TalentEventDetails>();
  const { me } = useGetMe();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data: event, isLoading } = useGetEventDetailsForTalent({
    event_id: params?.eventId!,
  });

  console.log('event', event);

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

  const handleAddToCalendar = async () => {
    try {
      const status = await RNCalendarEvents.requestPermissions();

      if (status !== 'authorized') {
        Alert.alert(
          'Calendar Access Required',
          'Please enable calendar access in your device settings to add events.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        return;
      }

      const startDate = new Date(event?.start_at ?? '').toISOString();
      const endDate = new Date(event?.end_at ?? '').toISOString();
      const title = event?.title ?? 'Event';

      const existingEvents = await RNCalendarEvents.fetchAllEvents(
        startDate,
        endDate,
      );
      const alreadyAdded = existingEvents.some(e => e.title === title);

      if (alreadyAdded) {
        showInfoToast('Event is already in your calendar');
        return;
      }

      const location = event?.event_location?.formatted_address ?? '';
      const notes = event?.description ?? event?.brief ?? '';

      await RNCalendarEvents.saveEvent(title, {
        startDate,
        endDate,
        location,
        notes: Platform.OS === 'ios' ? notes : undefined,
        description: Platform.OS === 'android' ? notes : undefined,
      });

      showSuccessToast('Event added to your calendar');
    } catch (error) {
      console.log('Calendar error:', error);
      showErrorToast('Failed to add event to calendar');
    }
  };

  const timezone = event?.event_location?.timezone || 'UTC';

  const startAtFormatted = event?.start_at
    ? formatInTimeZone(event.start_at, timezone, 'd MMM, yyyy')
    : '';

  const duration =
    event?.start_at && event?.end_at
      ? calculateEventDuration(event.start_at, event.end_at)
      : { formatted: '' };

  const officeCountryName = event?.office_country_code
    ? getCountryNameByCode(event.office_country_code)
    : undefined;

  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitleAndImageBg"
      headerStyles={styles.header}
      contentContainerStyle={{ paddingBottom: insets.bottom || 24 }}
      customElement={
        <EventHeaderElement
          showSkeleton={isLoading}
          title={event?.title}
          image={event?.brand_logo_path ?? undefined}
        />
      }
      rightIcons={[
        { icon: () => ICONS.bell('white'), onPress: () => {}, size: 20 },
      ]}
    >
      <View style={styles.container}>
        <EventDetailsTextBlock
          showSkeleton={isLoading}
          label="Description"
          text={event?.description}
        />

        <EventDetailsCardWithMap
          showSkeleton={isLoading}
          startAtFormatted={startAtFormatted}
          location={
            event?.event_location
              ? {
                  formatted_address: event.event_location.formatted_address,
                  latitude: event.event_location.latitude,
                  longitude: event.event_location.longitude,
                }
              : null
          }
          officeCountryName={officeCountryName}
          duration={duration.formatted}
        />

        <EventDetailsTextBlock
          showSkeleton={isLoading}
          label="Payment"
          text={
            event?.payment_mode === 'fixed'
              ? `$${event?.payment_amount}`
              : event?.payment_amount
              ? `$${event.payment_amount} per hour`
              : undefined
          }
        />

        <If condition={!!event?.event_age_groups?.length}>
          <View style={{ gap: 10 }}>
            {event?.event_age_groups?.map(group => (
              <EventGroupDetails group={group} key={group.id} />
            ))}
          </View>
        </If>

        <If condition={!isLoading}>
          <>
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

            {!!event?.nda_file_path && (
              <ActionPurpleButton
                icon={ICONS.upload('main')}
                titleIcon={ICONS.paperClip('main')}
                title="VIEW NDA"
                onPress={() => {
                  goToScreen(Screens.PDFViewer, {
                    pdfPath: event?.nda_file_path!,
                    bucket: 'event_nda',
                    title: 'Event NDA',
                  });
                }}
              />
            )}

            <ActionPurpleButton
              icon={ICONS.calendarEvent('main')}
              title="ADD EVENT TO MY CALENDAR"
              onPress={handleAddToCalendar}
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
        eventName={event?.title ?? ''}
        participationId={params?.participationId ?? ''}
        isVisible={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </ScreenWithScrollWrapper>
  );
};
