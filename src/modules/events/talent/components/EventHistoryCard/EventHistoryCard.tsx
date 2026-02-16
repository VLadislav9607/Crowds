import { View, GestureResponderEvent } from 'react-native';
import { formatInTimeZone } from 'date-fns-tz';
import { IconText, AppText, DashedLine, IconButton } from '@ui';
import { ICONS } from '@assets';
import { AppImage, If, usePopupMenu, IPopupMenuItem } from '@components';
import { calculateEventDuration } from '../../../helpers';
import { styles } from './styles';
import { EventHistoryCardProps } from './types';

const MENU_ITEMS: IPopupMenuItem[] = [
  { label: 'Flag Organization', value: 'flag_organization' },
];

export const EventHistoryCard = ({
  event,
  onMenuSelect,
}: EventHistoryCardProps) => {
  const { showPopup } = usePopupMenu();
  const timezone = event.location?.timezone || 'UTC';

  const startAt = event.start_at
    ? formatInTimeZone(event.start_at, timezone, 'dd MMM, yyyy')
    : '';

  const eventDuration =
    event.start_at && event.end_at
      ? calculateEventDuration(event.start_at, event.end_at)
      : { formatted: '' };

  const paymentText = event.payment_amount
    ? `$${event.payment_amount} · ${
        event.payment_mode === 'per_hour' ? 'Per hour' : 'Fixed'
      }`
    : null;

  const handleOpenMenu = (e: GestureResponderEvent) => {
    const { pageX, pageY } = e.nativeEvent;
    showPopup({
      items: MENU_ITEMS,
      position: { x: pageX, y: pageY },
      onSelect: onMenuSelect,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header: logo + title + date */}
      <View style={styles.header}>
        <If condition={!!event.brand_logo_path}>
          <AppImage
            imgPath={event.brand_logo_path}
            bucket="organizations_avatars"
            containerStyle={styles.logo}
          />
        </If>
        <View style={styles.headerContent}>
          <AppText style={styles.title} numberOfLines={1} typography="bold_14">
            {event.title}
          </AppText>
          <If condition={!!event.brand_name}>
            <AppText
              typography="medium_12"
              color="gray_primary"
              numberOfLines={1}
            >
              {event.brand_name}
            </AppText>
          </If>
        </View>
        <IconButton
          icon={ICONS.dotsVertical()}
          iconSize={24}
          onPress={handleOpenMenu}
        />
      </View>

      <DashedLine strokeDasharray="3 3" />

      {/* Details */}
      <View style={styles.detailsRow}>
        <If condition={!!startAt}>
          <IconText
            icon={ICONS.calendarV2('main')}
            text={startAt}
            iconSize={14}
            textProps={{ typography: 'medium_12', color: 'gray_primary' }}
          />
        </If>
        <If condition={!!eventDuration.formatted}>
          <IconText
            icon={ICONS.clockV2('main')}
            text={eventDuration.formatted}
            iconSize={14}
            textProps={{ typography: 'medium_12', color: 'gray_primary' }}
          />
        </If>
      </View>

      <If condition={!!event.location?.formatted_address}>
        <IconText
          icon={ICONS.locationPin('main')}
          text={event.location?.formatted_address || ''}
          textProps={{
            numberOfLines: 1,
            color: 'gray_primary',
            typography: 'medium_12',
            style: { flexShrink: 1 },
          }}
          iconSize={14}
        />
      </If>

      <If condition={!!paymentText}>
        <IconText
          icon={ICONS.moneyBag('main')}
          text={paymentText || ''}
          textProps={{ typography: 'medium_12', color: 'gray_primary' }}
          iconSize={14}
        />
      </If>

    </View>
  );
};
