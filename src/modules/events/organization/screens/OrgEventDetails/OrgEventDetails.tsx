import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { If, ScreenWithScrollWrapper, Skeleton } from '@components';
import {
  ActionPurpleButton,
  AppText,
  ChatButton,
  GridBoard,
  IGridBoardItem,
} from '@ui';
import { Screens, useScreenNavigation, goToScreen } from '@navigation';
import { ICONS } from '@assets';
import {
  useGetMe,
  useGetGroupChatId,
  ChatType,
  useGetEventForOrgMember,
} from '@actions';
import { useCreateChatAndNavigate } from '@modules/common';

import {
  EventDetailsCardWithMap,
  EventDetailsTextBlock,
  EventDetailsRequirements,
  EventHeaderElement,
} from '../../../components';
// import { CancelEventAttendanceModal } from '../../modals';
import { styles } from './styles';
import { formatInTimeZone } from 'date-fns-tz';
import { calculateEventDuration } from '../../../helpers';
import { COLORS } from '@styles';
import { SvgXml } from 'react-native-svg';

export const OrgEventDetails = () => {
  const insets = useSafeAreaInsets();
  const { params } = useScreenNavigation<Screens.TalentEventDetails>();
  const { me, organizationMember } = useGetMe();
  const { data: event, isLoading } = useGetEventForOrgMember({
    event_id: params?.eventId!,
  });

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

  const startAtTimezone = event?.start_at
    ? formatInTimeZone(
        event.start_at,
        event?.event_location?.timezone!,
        'd MMM, yyyy',
      )
    : '';

  const duration =
    event?.start_at && event?.end_at
      ? calculateEventDuration(event.start_at, event.end_at)
      : { formatted: '' };

  const chevronRightIcon = (
    <SvgXml width={22} height={22} xml={ICONS.chevronRight('main')} />
  );

  const participationBoard: IGridBoardItem[] = [
    {
      title: 'Invited',
      count: 0,
      bgColor: COLORS.light_purple,
      textColor: COLORS.main,
      labelElement: chevronRightIcon,
      showSkeleton: isLoading,
    },
    {
      title: 'Applied',
      count: 0,
      bgColor: COLORS.light_purple,
      textColor: COLORS.main,
      labelElement: chevronRightIcon,
      showSkeleton: isLoading,
    },
    {
      title: 'Approved',
      bgColor: COLORS.light_purple,
      textColor: COLORS.main,
      countElement: (
        <AppText typography="bold_24" color="main">
          0
          <AppText typography="bold_14" color="main_60">
            {' '}
            / 70
          </AppText>
        </AppText>
      ),
      labelElement: chevronRightIcon,
      showSkeleton: isLoading,
    },
    {
      title: 'Rejected',
      bgColor: COLORS.red_light,
      textColor: COLORS.red,
      count: 5,
      labelElement: chevronRightIcon,
      showSkeleton: isLoading,
    },
  ];

  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitleAndImageBg"
      headerStyles={styles.header}
      contentContainerStyle={{ paddingBottom: insets.bottom || 24 }}
      customElement={
        <EventHeaderElement
          showSkeleton={isLoading}
          title={event?.title}
          image={organizationMember?.organization?.avatar_path}
        />
      }
      rightIcons={[
        { icon: () => ICONS.bell('white'), onPress: () => {}, size: 20 },
      ]}
    >
      <View style={styles.container}>
        <GridBoard
          containerStyle={styles.gridBoardContainer}
          items={participationBoard}
          counterProps={{ typography: 'bold_24', color: 'main' }}
        />

        <View style={styles.chatButtonsContainer}>
          <ChatButton
            isLoading={isCreatingChat}
            style={styles.chatButton}
            topText="CHAT WITH"
            bottomText="INDIVIDUALS"
            onPress={handleChatWithOrganizer}
            showSkeleton={isLoading}
          />
          <ChatButton
            style={styles.chatButton}
            topText="CHAT IN"
            isLoading={isGettingGroupChatId}
            bottomText="GROUP"
            onPress={handleChatWithGroup}
            showSkeleton={isLoading}
          />
        </View>

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
              <SvgXml width={22} height={22} xml={ICONS.chevronRight('main')} />
            </View>
          </TouchableOpacity>
        </If>

        <EventDetailsTextBlock
          showSkeleton={isLoading}
          label="Description"
          text={event?.brief}
        />

        <EventDetailsCardWithMap
          showSkeleton={isLoading}
          startAtFormatted={startAtTimezone}
          location={{
            formatted_address: event?.event_location?.formatted_address!,
            latitude: event?.event_location?.latitude!,
            longitude: event?.event_location?.longitude!,
          }}
          duration={duration.formatted}
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
              title="VIEW ATTACHED FILE"
            />
          )}
        </If>
      </View>

      {/* <CancelEventAttendanceModal
        eventName={eventName}
        participationId={params?.participationId ?? ''}
        isVisible={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      /> */}
    </ScreenWithScrollWrapper>
  );
};
