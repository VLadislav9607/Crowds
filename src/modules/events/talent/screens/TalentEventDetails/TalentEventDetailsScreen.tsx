import { useEffect, useRef, useState } from 'react';
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
  getActiveFlagForTargetAction,
} from '@actions';
import { TalentFlag } from '@modules/common';
import { useQuery } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';
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

  const officeId = event?.office_id;
  const { data: officeFlag } = useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_MY_ACTIVE_FLAG, 'office', officeId],
    queryFn: () =>
      getActiveFlagForTargetAction({
        targetType: 'organization',
        targetId: officeId!,
      }),
    enabled: !!officeId,
    staleTime: Infinity,
  });
  const officeFlagStatus =
    (officeFlag?.status as TalentFlag) ?? TalentFlag.GREEN;

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
      title: event.title ? `${event.title} · Group` : 'Group messages',
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

  const checkinOpensAtFormatted = event?.checkin_opens_at
    ? formatInTimeZone(event.checkin_opens_at, timezone, 'd MMM yyyy, h:mm a')
    : '';

  const checkinClosesAtFormatted = event?.start_at
    ? formatInTimeZone(event.start_at, timezone, 'd MMM yyyy, h:mm a')
    : '';

  const officeCountryName = event?.office_country_code
    ? getCountryNameByCode(event.office_country_code)
    : undefined;

  const isMediaProduction = event?.event_type === 'media_production';
  const hasCheckedIn = !!event?.checked_in_at;
  const hasCheckedOut = !!event?.checked_out_at;

  const [elapsed, setElapsed] = useState('');

  useEffect(() => {
    if (!hasCheckedIn || hasCheckedOut) return;

    const checkedInTime = new Date(event!.checked_in_at!).getTime();

    const updateElapsed = () => {
      const diff = Math.max(0, Date.now() - checkedInTime);
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setElapsed(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
          2,
          '0',
        )}:${String(seconds).padStart(2, '0')}`,
      );
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [hasCheckedIn, hasCheckedOut, event?.checked_in_at]);

  const finalDuration = (() => {
    if (!event?.checked_in_at || !event?.checked_out_at) return '';
    const diff =
      new Date(event.checked_out_at).getTime() -
      new Date(event.checked_in_at).getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(seconds).padStart(2, '0')}`;
  })();

  const checkedInFormatted = event?.checked_in_at
    ? formatInTimeZone(event.checked_in_at, timezone, 'h:mm a')
    : '';
  const checkedOutFormatted = event?.checked_out_at
    ? formatInTimeZone(event.checked_out_at, timezone, 'h:mm a')
    : '';
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
      eventLocation={
        event?.event_location?.formatted_address || officeCountryName
      }
      eventDate={startDateTimeFormatted}
      logoPath={event?.brand_logo_path ?? undefined}
      officeFlag={officeFlagStatus}
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
          checkinOpensAtFormatted={checkinOpensAtFormatted}
          checkinClosesAtFormatted={checkinClosesAtFormatted}
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

        <If condition={!isLoading && hasCheckedIn}>
          <View style={styles.checkinStatusSection}>
            <View style={styles.checkinStatusRow}>
              <AppText typography="regular_14" color="gray">
                Checked in at
              </AppText>
              <AppText typography="semibold_14" color="black">
                {checkedInFormatted}
              </AppText>
            </View>
            <If condition={hasCheckedOut}>
              <View style={styles.checkinStatusRow}>
                <AppText typography="regular_14" color="gray">
                  Checked out at
                </AppText>
                <AppText typography="semibold_14" color="black">
                  {checkedOutFormatted}
                </AppText>
              </View>
            </If>
            <View style={styles.checkinStatusRow}>
              <AppText typography="regular_14" color="gray">
                Duration
              </AppText>
              <AppText
                typography="semibold_14"
                color={hasCheckedOut ? 'black' : 'green'}
              >
                {hasCheckedOut ? finalDuration : elapsed}
              </AppText>
            </View>
          </View>
        </If>

        <EventDetailsTextBlock
          label="How To Check In and Out"
          text={
            'Talent can check in for events using the green check in button.\n\n' +
            'If your event is on premise (on site) your event organiser will have a printed QR for you to scan in and out.\n\n' +
            'If you are being sent product, your event organiser may elect to post your QR code to you with your product. QR codes may also arrive digitally in your messages to be downloaded and printed and or sent to your email.\n\n' +
            'Please make sure you read the full description and follow the tasks exactly; and contact your organiser if unsure.\n\n' +
            'QR codes are unique to your biometric ID and cannot be recognised and or scanned by any other person and or device. If you attempt to scan with another device that does not have your CrowdsNow ID attached you may be permanently banned from the platform.'
          }
        />

        <If
          condition={!isLoading && !!event?.participation_id && !hasCheckedIn}
        >
          <AppButton
            onPress={() =>
              goToScreen(Screens.BottomTabs, { screen: Screens.TalerQRCode })
            }
            title="Check In"
            wrapperStyles={{ backgroundColor: COLORS.green }}
            titleStyles={{ color: COLORS.white }}
          />
        </If>

        <If condition={!isLoading && hasCheckedIn && !hasCheckedOut}>
          <AppButton
            onPress={() =>
              goToScreen(Screens.BottomTabs, { screen: Screens.TalerQRCode })
            }
            title="Check Out"
            wrapperStyles={{ backgroundColor: COLORS.red }}
            titleStyles={{ color: COLORS.white }}
          />
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
