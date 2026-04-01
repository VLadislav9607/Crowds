import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { isPast } from 'date-fns';
import { If, Skeleton } from '@components';
import {
  ActionPurpleButton,
  AppButton,
  AppText,
  ChatButton,
  GridBoard,
  IGridBoardItem,
} from '@ui';
import { Screens, useScreenNavigation, goToScreen, goBack } from '@navigation';
import { ICONS } from '@assets';
import {
  useGetMe,
  ChatType,
  useGetEventForOrgMember,
  useCopyEventToDraft,
  useEventParticipantsCounts,
} from '@actions';

import {
  EventDetailsCardWithMap,
  EventDetailsTextBlock,
  EventGroupDetails,
  EventTasksSection,
} from '../../../components';
import { EventDetailScreenLayout } from '../../../layouts';
import { CancelEventModal } from '../../modals';
import { styles } from './styles';
import { formatInTimeZone } from 'date-fns-tz';
import { COLORS } from '@styles';
import { SvgXml } from 'react-native-svg';
import {
  getCountryNameByCode,
  showSuccessToast,
  showMutationErrorToast,
} from '@helpers';

export const OrgEventDetails = () => {
  const { params } = useScreenNavigation<Screens.TalentEventDetails>();
  const { organizationMember } = useGetMe();
  const capabilitiesAccess =
    organizationMember?.current_context?.capabilitiesAccess;

  const { data: event, isLoading } = useGetEventForOrgMember({
    event_id: params?.eventId!,
  });

  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  const counts = useEventParticipantsCounts(params?.eventId ?? '');

  const totalCapacity =
    event?.event_age_groups?.reduce(
      (sum, g) =>
        sum +
        (g.male_count ?? 0) +
        (g.female_count ?? 0) +
        (g.other_count ?? 0),
      0,
    ) ?? 0;

  const navigateToApplicants = (
    initialTab: 'invited' | 'applied' | 'approved' | 'rejected',
  ) => {
    goToScreen(Screens.EventApplicants, {
      eventId: params?.eventId!,
      capacity: totalCapacity,
      initialTab,
    });
  };

  const { mutate: copyToDraft, isPending: isCopying } = useCopyEventToDraft({
    onSuccess: () => {
      showSuccessToast('Event copied to draft');
    },
    onError: (e: Error) => showMutationErrorToast(e),
  });

  const handleChatWithGroup = () => {
    if (!event?.group_chat_id) return;
    goToScreen(Screens.ChatRoom, {
      chatId: event.group_chat_id,
      chatType: ChatType.Group,
      title: event.title ? `${event.title} · Group` : 'Group messages',
      imageUrl: '',
    });
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

  const chevronRightIcon = (
    <SvgXml width={22} height={22} xml={ICONS.chevronRight('main')} />
  );

  const participationBoard: IGridBoardItem[] = [
    {
      title: 'Invited',
      count: counts.invited,
      bgColor: COLORS.light_purple,
      textColor: COLORS.main,
      labelElement: chevronRightIcon,
      showSkeleton: isLoading,
      onPress: () => navigateToApplicants('invited'),
    },
    {
      title: 'Applied',
      count: counts.applied,
      bgColor: COLORS.light_purple,
      textColor: COLORS.main,
      labelElement: chevronRightIcon,
      showSkeleton: isLoading,
      onPress: () => navigateToApplicants('applied'),
    },
    {
      title: 'Approved',
      bgColor: COLORS.light_purple,
      textColor: COLORS.main,
      countElement: (
        <AppText typography="bold_24" color="main">
          {counts.approved}
          <AppText typography="bold_14" color="main_60">
            {' '}
            / {totalCapacity}
          </AppText>
        </AppText>
      ),
      labelElement: chevronRightIcon,
      showSkeleton: isLoading,
      onPress: () => navigateToApplicants('approved'),
    },
    {
      title: 'Rejected',
      bgColor: COLORS.red_light,
      textColor: COLORS.red,
      count: counts.rejected,
      labelElement: chevronRightIcon,
      showSkeleton: isLoading,
      onPress: () => navigateToApplicants('rejected'),
    },
  ];

  return (
    <EventDetailScreenLayout
      eventTitle={event?.title}
      eventLocation={event?.event_location?.formatted_address || officeCountryName}
      eventDate={startDateTimeFormatted}
      logoPath={organizationMember?.current_context?.brand?.logo_path}
    >
      <View style={styles.container}>
        <If condition={!!capabilitiesAccess?.approve_applicants}>
          <GridBoard
            containerStyle={styles.gridBoardContainer}
            items={participationBoard}
            counterProps={{ typography: 'bold_24', color: 'main' }}
          />
        </If>

        <View style={styles.chatButtonsContainer}>
          <If condition={!!capabilitiesAccess?.one_on_one_message}>
            <ChatButton
              style={styles.chatButton}
              topText="CHAT WITH"
              bottomText="INDIVIDUALS"
              onPress={() => {
                const capacity =
                  event?.event_age_groups?.reduce(
                    (sum, g) =>
                      sum +
                      (g.male_count || 0) +
                      (g.female_count || 0) +
                      (g.other_count || 0),
                    0,
                  ) ?? 0;
                goToScreen(Screens.EventApplicants, {
                  eventId: params?.eventId!,
                  capacity,
                  initialTab: 'approved',
                });
              }}
              showSkeleton={isLoading}
            />
          </If>
          <If condition={!!capabilitiesAccess?.group_message}>
            <ChatButton
              style={styles.chatButton}
              topText="CHAT IN"
              bottomText="GROUP"
              onPress={handleChatWithGroup}
              showSkeleton={isLoading}
            />
          </If>
        </View>

        <If condition={!!capabilitiesAccess?.manage_checkins}>
          <If condition={isLoading}>
            <Skeleton>
              <Skeleton.Item width={'100%'} height={60} borderRadius={20} />
            </Skeleton>
          </If>

          <If condition={!isLoading}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                goToScreen(Screens.EventQRCodes, {
                  eventId: params?.eventId!,
                  timezone: event?.event_location?.timezone,
                });
              }}
              style={styles.qrCodeButton}
            >
              <AppText typography="bold_16" color="black">
                QR CODES
              </AppText>
              <View style={styles.qrCodeButtonRight}>
                <AppText typography="bold_16" color="main">
                  {event?.qr_codes_count || 0}
                </AppText>
                <SvgXml
                  width={22}
                  height={22}
                  xml={ICONS.chevronRight('main')}
                />
              </View>
            </TouchableOpacity>
          </If>
        </If>

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
          label="Brief"
          text={event?.brief}
        />

        <EventDetailsTextBlock
          showSkeleton={isLoading}
          label="Description"
          text={event?.description}
        />

        <EventDetailsTextBlock
          showSkeleton={isLoading}
          label="Event Visibility"
          text={event?.visibility === 'public' ? 'Public' : 'Private'}
        />

        <EventDetailsTextBlock
          showSkeleton={isLoading}
          label="Payment"
          text={
            event?.payment_mode === 'fixed'
              ? `$${event?.payment_amount}`
              : `$${event?.payment_amount} per hour`
          }
        />

        <If condition={!isLoading}>
          <EventTasksSection
            variant="org"
            systemTaskState={{
              checkedInAt: null,
              checkedOutAt: null,
              taskPhotoPath: null,
              isMediaProduction:
                (event as any)?.event_type === 'media_production',
            }}
            customTasks={event?.custom_tasks ?? []}
            timezone={event?.event_location?.timezone ?? 'UTC'}
          />
        </If>

        <View style={{ gap: 10 }}>
          <AppText typography="bold_16" margin={{ bottom: 8 }}>
            Participant Requirements
          </AppText>
          {event?.event_age_groups?.map(group => (
            <EventGroupDetails group={group} key={group.id} />
          ))}
        </View>

        {/* <EventDetailsTags
          tags={['Tag 1', 'Tag 2', 'Tag 3']}
          showSkeleton={isLoading}
        /> */}

        {/* <EventDetailsTextBlock
          label="Additional Details/Notes"
          text="Full details including times will be sent to your Crowds Now inbox no earlier than 24 hours prior to filming."
          showSkeleton={isLoading}
        /> */}

        <If condition={!isLoading}>
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
        </If>

        <If condition={!isLoading && !!capabilitiesAccess?.create_event_draft}>
          <AppButton
            icon={ICONS.copyIcon('black')}
            title="Copy to draft"
            variant="withBorder"
            isLoading={isCopying}
            onPress={() => {
              copyToDraft({ eventId: params?.eventId! });
            }}
          />
        </If>

        <If
          condition={
            !isLoading &&
            !!capabilitiesAccess?.create_events &&
            event?.status === 'published' &&
            !(event?.end_at && isPast(new Date(event.end_at)))
          }
        >
          <AppButton
            onPress={() => setIsCancelModalVisible(true)}
            title="Cancel event"
            variant="withBorder"
            size="60"
            wrapperStyles={{ borderColor: COLORS.red }}
            titleStyles={{ color: COLORS.red }}
          />
        </If>
      </View>

      <CancelEventModal
        eventId={params?.eventId!}
        eventName={event?.title ?? ''}
        isVisible={isCancelModalVisible}
        onClose={() => setIsCancelModalVisible(false)}
        onSuccess={() => {
          setTimeout(() => {
            goBack();
          }, 300);
        }}
      />
    </EventDetailScreenLayout>
  );
};
