import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { AppButton, AppText, IconText } from '@ui';
import { styles } from './styles';
import { ICONS, IMAGES } from '@assets';
import { SvgXml } from 'react-native-svg';
import { TalentEventCardCompactProps } from './types';
import { If } from '@components';
import { COLORS } from '@styles';
import { goToScreen, Screens } from '@navigation';
import { formatInTimeZone } from 'date-fns-tz';
import { calculateEventDuration } from '../../../helpers';
import { getEventIcon } from '../../../helpers';

export const TalentEventCardCompact = ({
  event,
  containerStyle,
  type = 'random',
  onPressAccept,
  onPressDecline,
}: TalentEventCardCompactProps) => {
  const timezone = 'UTC';

  const startAt = event?.startAt
    ? formatInTimeZone(event.startAt, timezone, 'dd MMM, yyyy')
    : '';

  const eventDuration =
    event?.startAt && event?.endAt
      ? calculateEventDuration(event.startAt, event.endAt)
      : { formatted: '' };

  const eventIcon = getEventIcon(event.categoryId);

  return (
    <View style={[styles.container, containerStyle]}>
      <ImageBackground
        source={IMAGES.cardCrowdBg}
        style={styles.imageContainer}
      >
        <View style={styles.iconContainer}>
          <SvgXml xml={eventIcon('white')} width={20} height={20} />
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <View style={styles.contentHeaderLeft}>
            <AppText
              renderIf={type === 'approved'}
              typography="semibold_16"
              margin={{ bottom: 8 }}
            >
              {event.eventTitle}
            </AppText>

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
                text={event.participantsCount}
                textProps={{ typography: 'medium_12', color: 'black_50' }}
              />
            </View>

            <If condition={!!event.formattedAddress}>
              <IconText
                icon={ICONS.locationPin('main')}
                iconSize={14}
                style={{ marginTop: 6 }}
                text={event.formattedAddress}
                textProps={{
                  typography: 'medium_12',
                  color: 'black_50',
                }}
              />
            </If>
          </View>

          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <SvgXml xml={ICONS.saved('main')} width={18} height={18} />
          </TouchableOpacity>
        </View>

        <View style={styles.separatorDashedLine} />

        <AppText typography="regular_14" color="black">
          {event.description}
        </AppText>

        <View style={styles.priceContainer}>
          <View style={styles.pricePadge}>
            <AppText typography="bold_14" color="main">
              ${event.paymentAmount}
            </AppText>
            <AppText typography="medium_10" color="main">
              AUD
            </AppText>
          </View>
          <AppText typography="medium_12" color="black_50">
            {event.paymentMode === 'fixed' ? 'Fixed price' : 'Price per hour'}
          </AppText>
        </View>

        <If condition={type !== 'denied'}>
          <View style={styles.separatorDashedLine} />
        </If>

        <View style={styles.buttonsContainer}>
          <If condition={type === 'random'}>
            <TouchableOpacity activeOpacity={0.8} style={styles.redButton}>
              <AppText typography="bold_14" color="red">
                Reject
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.greenButton}>
              <AppText typography="bold_14" color="green">
                Apply
              </AppText>
            </TouchableOpacity>
          </If>

          <If condition={type === 'proposed'}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.redButton}
              onPress={() => onPressDecline?.(event.participationId)}
            >
              <AppText typography="bold_14" color="red">
                Decline
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.greenButton}
              onPress={() => onPressAccept?.(event.participationId)}
            >
              <AppText typography="bold_14" color="green">
                Accept
              </AppText>
            </TouchableOpacity>
          </If>

          <If condition={type === 'pending'}>
            <AppButton
              variant="withBorder"
              size="36"
              titleStyles={{ color: COLORS.black }}
              title="Cancel application"
              onPress={() => {}}
            />
          </If>

          <If condition={type === 'approved'}>
            <View style={styles.approvedButtons}>
              <AppButton
                size="37"
                icon={ICONS.chats('white')}
                iconSize={20}
                title="Message"
                wrapperStyles={styles.messageButtonWrapper}
                onPress={() => {}}
              />

              <TouchableOpacity
                onPress={() => goToScreen(Screens.TalentEventDetails)}
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
            </View>
          </If>
        </View>
      </View>
    </View>
  );
};
