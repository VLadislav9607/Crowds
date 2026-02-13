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
  EventHeaderElement,
  EventGroupDetails,
} from '../../../components';
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

  console.log('event', event);

  const handleChatWithGroup = () => {
    getGroupChatId(params?.eventId ?? '');
  };

  // const converGroupDetailsRequirements = (group: EventAgeGroupDto): EventDetailsRequirementItem[] => {
  //   const genderOptions = []
  //   if(!!group.male_count) genderOptions.push(`${group.male_count} Male`);
  //   if(!!group.female_count) genderOptions.push(`${group.female_count} Female`);
  //   if(!!group.other_count) genderOptions.push(`${group.other_count} Others`);

  //   const isPreferencesPresent = !!group?.preferences

  //   const ethnicityOptionsList = isPreferencesPresent ? ethnicityOptions.filter(item => group.preferences.ethnicities?.some(ethnicity => ethnicity.value === item.value)).map(item => item.label) ?? [] : [];
  //   const accentOptionsList = isPreferencesPresent ? accentOptions.filter(item => group.preferences.accents?.some(accent => accent.value === item.value)).map(item => item.label) ?? [] : [];
  //   const eyeColorOptionsList = isPreferencesPresent ? eyeColourOptions.filter(item => group.preferences.eye_colors?.some(eyeColor => eyeColor.value === item.value)).map(item => item.label) ?? [] : [];
  //   const hairColourOptionsList = isPreferencesPresent ? hairColourOptions.filter(item => group.preferences.hair_colors?.some(hairColor => hairColor.value === item.value)).map(item => item.label) ?? [] : [];
  //   const facialAttributesOptionsList = isPreferencesPresent ? facialAttributesOptions.filter(item => group.preferences.facial_attributes?.some(facialAttribute => facialAttribute.value === item.value)).map(item => item.label) ?? [] : [];
  //   const bodyAttributesOptionsList = isPreferencesPresent ? bodyAttributesOptions.filter(item => group.preferences.body_attributes?.some(bodyAttribute => bodyAttribute.value === item.value)).map(item => item.label) ?? [] : [];
  //   const tattooSpotOptionsList = isPreferencesPresent ? tattooSpotOptions.filter(item => group.preferences.tattoo_spots?.some(tattooSpot => tattooSpot.value === item.value)).map(item => item.label) ?? [] : [];
  //   const skinToneOptionsList = isPreferencesPresent ? skinToneOptions.filter(item => group.preferences.skin_tones?.some(skinTone => skinTone.value === item.value)).map(item => item.label) ?? [] : [];

  //   return [
  //     {title: 'Gender Required', options: genderOptions , useRowLayout: true},
  //     {title: 'Age Group', options: [`${group.min_age} - ${group.max_age} years of age`]},
  //     {title: 'Ethnicity', options: ethnicityOptionsList, invisible: !ethnicityOptionsList.length, useRowLayout: true},
  //     {title: 'Accent', options: accentOptionsList, invisible: !accentOptionsList.length, useRowLayout: true},
  //     {title: 'Eye Color', options: eyeColorOptionsList, invisible: !eyeColorOptionsList.length, useRowLayout: true},
  //     {title: 'Hair Colour', options: hairColourOptionsList, invisible: !hairColourOptionsList.length, useRowLayout: true},
  //     {title: 'Facial Attributes', options: facialAttributesOptionsList, invisible: !facialAttributesOptionsList.length, useRowLayout: true},
  //     {title: 'Body Attributes', options: bodyAttributesOptionsList, invisible: !bodyAttributesOptionsList.length, useRowLayout: true},
  //     {title: 'Tattoo Spot', options: tattooSpotOptionsList, invisible: !tattooSpotOptionsList.length, useRowLayout: true},
  //     {title: 'Skin Tone', options: skinToneOptionsList, invisible: !skinToneOptionsList.length, useRowLayout: true},
  //     {title: 'Pregnancy', options: isPreferencesPresent ? (group.preferences.pregnancy_allowed ? [`Required: ${group.preferences.pregnancy_months} months`] : ['Not Allowed']) : [], invisible: typeof group?.preferences?.pregnancy_allowed !== 'boolean' },
  //   ];
  // }

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
          image={organizationMember?.current_context?.brand?.logo_path}
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

        <EventDetailsTextBlock
          showSkeleton={isLoading}
          label="Brief"
          text={event?.brief}
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
      </View>
    </ScreenWithScrollWrapper>
  );
};
