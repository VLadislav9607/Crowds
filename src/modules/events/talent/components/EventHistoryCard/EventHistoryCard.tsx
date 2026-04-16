import { View, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { formatInTimeZone } from 'date-fns-tz';
import { IconText, AppText, DashedLine, IconButton } from '@ui';
import { ICONS } from '@assets';
import { AppImage, If, usePopupMenu, IPopupMenuItem } from '@components';
import { COLORS } from '@styles';
import { useLocalCurrency } from '@actions';
import { goToScreen, Screens } from '@navigation';
import { calculateEventDuration } from '../../../helpers';
import { styles } from './styles';
import { EventHistoryCardProps } from './types';

const MENU_ITEMS: IPopupMenuItem[] = [
  { label: 'Flag Organization', value: 'flag_organization' },
];

type PayoutStatus =
  | 'awaiting_settlement'
  | 'processing'
  | 'paid'
  | 'rejected'
  | 'failed';

const getStatusLabel = (status: PayoutStatus): string => {
  switch (status) {
    case 'paid':
      return 'Paid';
    case 'rejected':
      return 'Rejected';
    case 'failed':
      return 'Failed';
    case 'processing':
      return 'Processing';
    case 'awaiting_settlement':
    default:
      return 'Awaiting settlement';
  }
};

const getStatusColor = (status: PayoutStatus): string => {
  switch (status) {
    case 'paid':
      return COLORS.green;
    case 'rejected':
    case 'failed':
      return COLORS.red;
    case 'processing':
      return COLORS.blue;
    case 'awaiting_settlement':
    default:
      return COLORS.orange;
  }
};

export const EventHistoryCard = ({
  event,
  onMenuSelect,
}: EventHistoryCardProps) => {
  const { showPopup } = usePopupMenu();
  const { formatLocal } = useLocalCurrency();
  const timezone = event.location?.timezone || 'UTC';

  const startAt = event.start_at
    ? formatInTimeZone(event.start_at, timezone, 'dd MMM, yyyy')
    : '';

  const eventDuration =
    event.start_at && event.end_at
      ? calculateEventDuration(event.start_at, event.end_at)
      : { formatted: '' };

  const localPayment = event.payment_amount
    ? formatLocal(event.payment_amount * 100)
    : null;

  const paymentText = event.payment_amount
    ? `$${event.payment_amount} · ${
        event.payment_mode === 'per_hour' ? 'Per hour' : 'Fixed'
      }${localPayment ? ` (${localPayment})` : ''}`
    : null;

  const payoutStatus = event.payout_status;
  const statusColor = getStatusColor(payoutStatus);

  const localPaid =
    payoutStatus === 'paid' && event.payout_amount_cents != null
      ? formatLocal(event.payout_amount_cents)
      : null;

  const paidAmountText =
    payoutStatus === 'paid' && event.payout_amount_cents != null
      ? `$${(event.payout_amount_cents / 100).toFixed(0)}${
          localPaid ? ` (${localPaid})` : ''
        }`
      : null;

  const paidAtText =
    payoutStatus === 'paid' && event.paid_at
      ? formatInTimeZone(event.paid_at, timezone, 'dd MMM, yyyy')
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
      {/* Header: logo + title + status badge */}
      <View style={styles.header}>
        <If condition={!!event.brand_logo_path}>
          <AppImage
            imgPath={event.brand_logo_path}
            bucket="brand_avatars"
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
        <TouchableOpacity
          style={[styles.statusBadge, { backgroundColor: statusColor + '1A' }]}
          onPress={
            payoutStatus === 'awaiting_settlement' ||
            payoutStatus === 'processing'
              ? () =>
                  goToScreen(Screens.TalentPaymentHistory, {
                    initialTab: 'pending',
                  })
              : payoutStatus === 'paid'
                ? () =>
                    goToScreen(Screens.TalentPaymentHistory, {
                      initialTab: 'paid',
                    })
                : payoutStatus === 'rejected' || payoutStatus === 'failed'
                  ? () =>
                      goToScreen(Screens.TalentPaymentHistory, {
                        initialTab: 'rejected',
                      })
                  : undefined
          }
          activeOpacity={
            payoutStatus === 'awaiting_settlement' ||
            payoutStatus === 'processing' ||
            payoutStatus === 'paid' ||
            payoutStatus === 'rejected' ||
            payoutStatus === 'failed'
              ? 0.7
              : 1
          }
        >
          <AppText typography="bold_12" style={{ color: statusColor }}>
            {getStatusLabel(payoutStatus)}
          </AppText>
        </TouchableOpacity>
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

      {/* Payout info */}
      <If condition={payoutStatus === 'paid' && !!paidAmountText}>
        <View style={styles.payoutInfo}>
          <AppText typography="bold_12" style={{ color: COLORS.green }}>
            <AppText typography="bold_12" style={{ color: COLORS.black }}>
              Paid:
            </AppText>{' '}
            {paidAmountText}
          </AppText>
          <If condition={!!paidAtText}>
            <AppText typography="medium_12" color="gray_primary">
              {` · ${paidAtText}`}
            </AppText>
          </If>
        </View>
      </If>

      <If condition={payoutStatus === 'rejected' && !!event.rejection_reason}>
        <AppText typography="medium_12" style={{ color: COLORS.red }}>
          {event.rejection_reason}
        </AppText>
      </If>
    </View>
  );
};
