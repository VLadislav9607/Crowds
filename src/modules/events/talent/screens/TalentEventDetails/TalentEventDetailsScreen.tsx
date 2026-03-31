import { useRef, useState } from 'react';
import { Alert, Linking, Platform, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { If, AppImage } from '@components';
import { ActionPurpleButton, AppButton, AppText, ChatButton } from '@ui';
import { COLORS } from '@styles';
import { Screens, useScreenNavigation, goToScreen } from '@navigation';
import { ICONS } from '@assets';
import {
  useGetMe,
  ChatType,
  useGetEventDetailsForTalent,
  useBucketUpload,
  useSubmitTaskPhoto,
  useLocalCurrency,
  useToggleCustomTask,
} from '@actions';
import {
  useCreateChatAndNavigate,
  ImageSourcePickerModalData,
  ImageSourcePickerModal,
  PickedImage,
} from '@modules/common';
import {
  getCountryNameByCode,
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from '@helpers';
import { formatInTimeZone } from 'date-fns-tz';
import RNCalendarEvents from 'react-native-calendar-events';

import {
  EventDetailsCardWithMap,
  EventDetailsTextBlock,
  EventGroupDetails,
  EventTasksSection,
} from '../../../components';
import { EventDetailScreenLayout } from '../../../layouts';
import { CancelEventAttendanceModal } from '../../modals';
import { styles } from './styles';

export const TalentEventDetailsScreen = () => {
  const { params } = useScreenNavigation<Screens.TalentEventDetails>();
  const { me } = useGetMe();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const imageSourcePickerModalRef =
    useRef<BottomSheetModal<ImageSourcePickerModalData>>(null);

  const { data: event, isLoading } = useGetEventDetailsForTalent({
    event_id: params?.eventId!,
  });
  const { formatLocal } = useLocalCurrency();

  const { mutate: uploadFile, isPending: isUploading } = useBucketUpload({
    onSuccess: data => {
      if (!event?.participation_id) return;
      submitTask({
        participation_id: event.participation_id,
        photo_path: data.uploadedFile.path,
      });
    },
    onError: (error: Error) => {
      showErrorToast(error.message || 'Failed to upload photo');
    },
  });

  const { mutate: submitTask, isPending: isSubmitting } = useSubmitTaskPhoto({
    onSuccess: () => {
      showSuccessToast('Task photo submitted successfully');
    },
    onError: (error: Error) => {
      showErrorToast(error.message || 'Failed to submit task');
    },
  });

  const { mutate: toggleCustomTask } = useToggleCustomTask();

  const handleToggleCustomTask = (taskId: string) => {
    if (!event?.participation_id) return;
    toggleCustomTask({
      task_id: taskId,
      participation_id: event.participation_id,
    });
  };

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
    if (!event?.group_chat_id) return;
    goToScreen(Screens.ChatRoom, {
      chatId: event.group_chat_id,
      chatType: ChatType.Group,
      title: 'Group',
      imageUrl: '',
    });
  };

  const handleOpenPhotoPicker = () => {
    imageSourcePickerModalRef.current?.present({
      onImagePicked: (image: PickedImage) => {
        uploadFile({
          bucket: 'task_completion_photos',
          file: {
            uri: image.uri,
            type: image.type,
            name: image.name,
          },
        });
      },
    });
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

  const deviceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezone = event?.event_location?.timezone || deviceTimezone;

  const startDateTimeFormatted = event?.start_at
    ? formatInTimeZone(event.start_at, timezone, 'd MMM yyyy, h:mm a')
    : '';

  const endDateTimeFormatted = event?.end_at
    ? formatInTimeZone(event.end_at, timezone, 'd MMM yyyy, h:mm a')
    : '';

  const registrationClosesFormatted = event?.registration_closes_at
    ? formatInTimeZone(
        event.registration_closes_at,
        timezone,
        'd MMM yyyy, h:mm a',
      )
    : '';

  const checkinCutoffFormatted = event?.checkin_cutoff
    ? formatInTimeZone(event.checkin_cutoff, timezone, 'd MMM yyyy, h:mm a')
    : '';

  const officeCountryName = event?.office_country_code
    ? getCountryNameByCode(event.office_country_code)
    : undefined;

  const isMediaProduction = event?.event_type === 'media_production';
  const hasCheckedIn = !!event?.checked_in_at;
  const hasCheckedOut = !!event?.checked_out_at;
  const showTaskUpload = hasCheckedIn && !isMediaProduction;
  const showTaskBanner =
    hasCheckedOut && !isMediaProduction && event?.task_status === 'pending';
  const hasSubmittedTask = event?.task_status === 'submitted';
  const hasApprovedTask = event?.task_status === 'approved';
  const hasRejectedTask = event?.task_status === 'rejected';
  const isTaskProcessing = isUploading || isSubmitting;

  return (
    <EventDetailScreenLayout
      eventTitle={event?.title}
      eventLocation={event?.event_location?.formatted_address || officeCountryName}
      eventDate={startDateTimeFormatted}
      logoPath={event?.brand_logo_path ?? undefined}
    >
      <View style={styles.container}>
        <If condition={showTaskBanner}>
          <View style={styles.taskBanner}>
            <AppText typography="semibold_14" color="main">
              You've checked out! Please upload a task photo to complete your
              job. Once approved by the organizer, you'll be eligible for
              payment.
            </AppText>
          </View>
        </If>

        <EventDetailsTextBlock
          showSkeleton={isLoading}
          label="Description"
          text={event?.description}
        />

        <EventTasksSection
          variant="talent"
          systemTaskState={{
            checkedInAt: event?.checked_in_at ?? null,
            checkedOutAt: event?.checked_out_at ?? null,
            taskPhotoPath: event?.task_photo_path ?? null,
            isMediaProduction,
          }}
          customTasks={event?.custom_tasks ?? []}
          isCheckedIn={hasCheckedIn}
          onToggleCustomTask={handleToggleCustomTask}
          timezone={timezone}
        />

        <EventDetailsCardWithMap
          showSkeleton={isLoading}
          startTimeFormatted={startDateTimeFormatted}
          endTimeFormatted={endDateTimeFormatted}
          registrationClosesFormatted={registrationClosesFormatted}
          checkinCutoffFormatted={checkinCutoffFormatted}
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
        />

        <EventDetailsTextBlock
          showSkeleton={isLoading}
          label="Payment"
          text={(() => {
            if (!event?.payment_amount) return undefined;
            const usd =
              event.payment_mode === 'fixed'
                ? `$${event.payment_amount}`
                : `$${event.payment_amount} per hour`;
            const local = formatLocal(event.payment_amount * 100);
            return local ? `${usd} (${local})` : usd;
          })()}
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

            <If condition={showTaskUpload}>
              <View style={styles.taskUploadSection}>
                <If condition={!!event?.task_photo_path}>
                  <View style={styles.taskPhotoPreview}>
                    <AppImage
                      imgPath={event?.task_photo_path ?? undefined}
                      bucket="task_completion_photos"
                      containerStyle={styles.taskPhotoImage}
                    />
                  </View>
                </If>

                <If condition={hasApprovedTask}>
                  <AppText typography="bold_14" color="green">
                    Task approved
                  </AppText>
                </If>

                <If condition={hasRejectedTask}>
                  <AppText typography="bold_14" color="red">
                    Task rejected - please resubmit
                  </AppText>
                </If>

                <If condition={hasSubmittedTask}>
                  <AppText typography="bold_14" color="main">
                    Task submitted - pending review
                  </AppText>
                </If>

                <If condition={!hasApprovedTask}>
                  <AppButton
                    onPress={handleOpenPhotoPicker}
                    isDisabled={isTaskProcessing}
                    isLoading={isTaskProcessing}
                    loadingColor={COLORS.main}
                    title={
                      isTaskProcessing
                        ? 'Uploading...'
                        : event?.task_photo_path
                        ? 'Change task photo'
                        : 'Upload task photo'
                    }
                    variant="withBorder"
                    wrapperStyles={{ borderColor: COLORS.main }}
                    titleStyles={{ color: COLORS.main }}
                  />
                </If>
              </View>
            </If>
          </>

          <If condition={!hasCheckedIn && !event?.task_photo_path}>
            <AppButton
              onPress={() => setIsOpenModal(true)}
              title="Cancel attendance"
              variant="withBorder"
              wrapperStyles={{ borderColor: COLORS.red }}
              titleStyles={{ color: COLORS.red }}
            />
          </If>
        </If>
      </View>

      <ImageSourcePickerModal
        bottomSheetRef={imageSourcePickerModalRef}
        validateForBucket="task_completion_photos"
      />

      <CancelEventAttendanceModal
        eventName={event?.title ?? ''}
        participationId={params?.participationId ?? ''}
        isVisible={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </EventDetailScreenLayout>
  );
};
