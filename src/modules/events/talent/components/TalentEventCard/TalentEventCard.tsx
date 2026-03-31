import {
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useState } from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import { AppButton, AppText, IconText } from '@ui';
import { ICONS, IMAGES } from '@assets';
import { If, AppModal } from '@components';
import { getTimezoneOffsetHours, getCountryNameByCode } from '@helpers';
import { COLORS } from '@styles';
import { goToScreen, Screens } from '@navigation';
import { ChatType, useLocalCurrency } from '@actions';
import { calculateEventDuration, getEventIcon } from '../../../helpers';
import { TalentEventsTabs } from '../../../types';
import { TalentEventCardProps } from './types';
import { styles } from './styles';

export const TalentEventCard = ({
  event,
  containerStyle,
  addEventToForderModalRef,
  hideRejectButton = false,
  folderId,
  onAccept,
  onDecline,
  onApply,
  onReject,
  onCancelApplication,
  onRemoveEventFromFolder,
}: TalentEventCardProps) => {
  const handleOpenGroupChat = () => {
    if (!event.group_chat_id) return;
    goToScreen(Screens.ChatRoom, {
      chatId: event.group_chat_id,
      chatType: ChatType.Group,
      title: 'Group',
      imageUrl: '',
    });
  };

  const [isLoadingAccept, setIsLoadingAccept] = useState(false);
  const [isLoadingDecline, setIsLoadingDecline] = useState(false);
  const [isLoadingReject, setIsLoadingReject] = useState(false);
  const [isLoadingCancellation, setIsLoadingCancellation] = useState(false);
  const [isLoadingRemoveEventFromFolder, setIsLoadingRemoveEventFromFolder] =
    useState(false);
  const [showHideModal, setShowHideModal] = useState(false);

  const getEventStatus = (): TalentEventsTabs | 'random' => {
    if (!event?.participant) {
      return 'random';
    } else if (event?.participant?.status === 'approved') {
      return 'approved';
    } else if (
      event?.participant?.status === 'pending' &&
      event?.participant?.initiated_by === 'organization'
    ) {
      return 'proposed';
    } else if (
      event?.participant?.status === 'pending' &&
      event?.participant?.initiated_by === 'talent'
    ) {
      return 'pending';
    } else if (event?.participant?.status === 'rejected') {
      return 'denied';
    }
    return 'random';
  };

  const eventCardType = getEventStatus();

  const handleRemoveEventFromFolder = async () => {
    try {
      setIsLoadingRemoveEventFromFolder(true);
      await onRemoveEventFromFolder?.(event.event_id, folderId!);
    } finally {
      setIsLoadingRemoveEventFromFolder(false);
    }
  };

  const handleAccept = async () => {
    try {
      setIsLoadingAccept(true);
      await onAccept?.(event);
    } finally {
      setIsLoadingAccept(false);
    }
  };

  const handleDecline = async () => {
    try {
      setIsLoadingDecline(true);
      await onDecline?.(event.participant?.id!);
    } finally {
      setIsLoadingDecline(false);
    }
  };

  const handleApply = () => {
    onApply?.(event);
  };

  const handleHidePress = () => {
    setShowHideModal(true);
  };

  const handleConfirmHide = async () => {
    setShowHideModal(false);
    try {
      setIsLoadingReject(true);
      await onReject?.(event.event_id);
    } finally {
      setIsLoadingReject(false);
    }
  };

  const handleCancelApplication = async () => {
    try {
      setIsLoadingCancellation(true);
      await onCancelApplication?.(event.participant?.id!);
    } finally {
      setIsLoadingCancellation(false);
    }
  };

  const { formatLocal } = useLocalCurrency();
  const timezone = event?.location?.timezone || 'UTC';

  const timezoneOffset = getTimezoneOffsetHours(timezone);

  const [isInAnyFolder, setIsInAnyFolder] = useState(event.is_in_any_folder);

  const startAt = event?.start_at
    ? formatInTimeZone(event.start_at, timezone, 'dd MMM, yyyy')
    : '';

  const eventDuration =
    event?.start_at && event?.end_at
      ? calculateEventDuration(event.start_at, event.end_at)
      : { formatted: '' };

  const eventIcon = getEventIcon(event.category_id);

  const location = event?.location?.formatted_address
    ? event?.location?.formatted_address
    : event?.location?.city && event?.location?.country
    ? `${event?.location?.city}, ${event?.location?.country}`
    : event?.office_country_code
    ? getCountryNameByCode(event.office_country_code)
    : '';

  const handleSavePress = () => {
    if (addEventToForderModalRef?.current) {
      addEventToForderModalRef.current.present({
        eventId: event.event_id,
        onChangeIsInAnyFolder: setIsInAnyFolder,
      });
    }
  };

  const isUnavailable = event.is_available === false;

  return (
    <View style={[styles.container, containerStyle]}>
      <ImageBackground
        source={IMAGES.purpleCrowds}
        style={styles.imageContainer}
      >
        <View style={styles.iconContainer}>
          <SvgXml xml={eventIcon('white')} width={28} height={28} />
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <View style={styles.contentHeaderLeft}>
            <AppText typography="semibold_16" margin={{ bottom: 8 }}>
              {event.title}
            </AppText>

            <If condition={isUnavailable}>
              <View style={styles.unavailableBadge}>
                <AppText typography="bold_10" color="red">
                  Outside your schedule
                </AppText>
              </View>
            </If>

            <View style={styles.dateTimeContainer}>
              <IconText
                icon={ICONS.calendarIcon('main')}
                iconSize={14}
                text={startAt}
                textProps={{ typography: 'medium_12', color: 'black_50' }}
              />
              <IconText
                icon={ICONS.clockIcon('main')}
                iconSize={14}
                text={eventDuration.formatted}
                textProps={{ typography: 'medium_12', color: 'black_50' }}
              />

              <IconText
                icon={ICONS.usersRound('main')}
                iconSize={14}
                text={event.max_participations || 0}
                textProps={{ typography: 'medium_12', color: 'black_50' }}
              />
            </View>

            <If condition={!!location}>
              <IconText
                icon={ICONS.locationPin('main')}
                iconSize={14}
                style={{ marginTop: 6 }}
                text={location}
                textProps={{
                  typography: 'medium_12',
                  color: 'black_50',
                }}
              />
            </If>

            <AppText
              renderIf={!!event.location?.timezone && timezoneOffset !== 0}
              typography="medium_12"
              color="black_50"
              margin={{ top: 6 }}
            >
              {event.location?.timezone} ({timezoneOffset} hours to yours)
            </AppText>
          </View>

          <If condition={!!folderId}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleRemoveEventFromFolder}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {isLoadingRemoveEventFromFolder ? (
                <ActivityIndicator size="small" color={COLORS.red} />
              ) : (
                <SvgXml xml={ICONS.trash('red')} width={18} height={18} />
              )}
            </TouchableOpacity>
          </If>

          <If condition={!folderId}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => handleSavePress()}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <SvgXml
                xml={
                  isInAnyFolder
                    ? ICONS.savedFilled('main')
                    : ICONS.saved('main')
                }
                width={18}
                height={18}
              />
            </TouchableOpacity>
          </If>
        </View>

        <View style={styles.separatorDashedLine} />

        <AppText typography="regular_14" color="black">
          {event.brief}
        </AppText>

        <View style={styles.priceContainer}>
          <View style={styles.pricePadge}>
            <AppText typography="bold_14" color="main">
              ${event.payment_amount}
            </AppText>
            <AppText typography="medium_10" color="main">
              AUD
            </AppText>
          </View>
          <AppText typography="medium_12" color="black_50">
            {event.payment_mode === 'fixed' ? 'Fixed price' : 'Price per hour'}
          </AppText>
          <If
            condition={
              !!event.payment_amount &&
              !!formatLocal(event.payment_amount * 100)
            }
          >
            <AppText typography="medium_12" color="black_50">
              {formatLocal(event.payment_amount * 100)}
            </AppText>
          </If>
        </View>

        <If condition={eventCardType !== 'denied'}>
          <View style={styles.separatorDashedLine} />
        </If>

        <View style={styles.buttonsContainer}>
          <If condition={eventCardType === 'random'}>
            <If condition={!hideRejectButton}>
              <AppButton
                title="Hide"
                size="36"
                isLoading={isLoadingReject}
                loadingColor={COLORS.red}
                wrapperStyles={styles.redButton}
                titleStyles={{ color: COLORS.red }}
                onPress={handleHidePress}
              />
            </If>
            <AppButton
              title="Apply"
              size="36"
              loadingColor={COLORS.green}
              wrapperStyles={styles.greenButton}
              titleStyles={{ color: COLORS.green }}
              onPress={handleApply}
            />
          </If>

          <If condition={eventCardType === 'proposed' && !!event?.participant}>
            <AppButton
              title="Decline"
              size="36"
              isLoading={isLoadingDecline}
              loadingColor={COLORS.red}
              wrapperStyles={styles.redButton}
              titleStyles={{ color: COLORS.red }}
              onPress={handleDecline}
            />
          </If>
          <If
            condition={
              eventCardType === 'proposed' ||
              (eventCardType === 'denied' && !!event?.can_reaccept)
            }
          >
            <AppButton
              title="Accept"
              size="36"
              isLoading={isLoadingAccept}
              loadingColor={COLORS.green}
              wrapperStyles={styles.greenButton}
              titleStyles={{ color: COLORS.green }}
              onPress={handleAccept}
            />
          </If>

          <If condition={eventCardType === 'pending' && !!event?.participant}>
            <AppButton
              variant="withBorder"
              size="36"
              titleStyles={{ color: COLORS.black }}
              title="Cancel application"
              loadingColor="black"
              isLoading={isLoadingCancellation}
              onPress={handleCancelApplication}
            />
          </If>

          <If condition={eventCardType === 'approved'}>
            <View style={styles.approvedButtons}>
              <If condition={!event.nda_file_path || !!event.nda_accepted_at}>
                <AppButton
                  size="37"
                  icon={ICONS.chats('white')}
                  iconSize={20}
                  title="Message"
                  wrapperStyles={styles.messageButtonWrapper}
                  onPress={handleOpenGroupChat}
                />
              </If>

              <If condition={!!event.nda_file_path && !event.nda_accepted_at}>
                <AppButton
                  onPress={() => {
                    goToScreen(Screens.AcceptEventNda, {
                      eventId: event.event_id,
                      participationId: event.participant?.id!,
                      ndaFilePath: event.nda_file_path!,
                      ndaFileName: event.nda_file_name || undefined,
                    });
                  }}
                  size="37"
                  iconSize={20}
                  title="ACCEPT NDA"
                  wrapperStyles={styles.acceptNdaButtonWrapper}
                />
              </If>

              <If condition={!event.nda_file_path || !!event.nda_accepted_at}>
                <TouchableOpacity
                  onPress={() =>
                    goToScreen(Screens.TalentEventDetails, {
                      participationId: event.participant?.id!,
                      eventId: event.event_id,
                    })
                  }
                  style={styles.eventDetailsButton}
                >
                  <AppText typography="bold_12" color="main">
                    EVENT DETAILS
                  </AppText>
                  <SvgXml
                    xml={ICONS.chevronRight('black')}
                    width={14}
                    height={14}
                  />
                </TouchableOpacity>
              </If>
            </View>
          </If>
        </View>
      </View>

      <AppModal
        isVisible={showHideModal}
        onClose={() => setShowHideModal(false)}
        title="Hide event"
        subtitle="This event will no longer appear in your feed. Are you sure?"
        subtitleProps={{ typography: 'regular_14', margin: { top: 5 } }}
      >
        <AppButton
          title="Yes, hide"
          size="60"
          wrapperStyles={{ backgroundColor: COLORS.red_20 }}
          titleStyles={{ color: COLORS.red }}
          mb={10}
          onPress={handleConfirmHide}
        />
        <AppButton
          title="Cancel"
          size="60"
          variant="withBorder"
          onPress={() => setShowHideModal(false)}
        />
      </AppModal>
    </View>
  );
};
