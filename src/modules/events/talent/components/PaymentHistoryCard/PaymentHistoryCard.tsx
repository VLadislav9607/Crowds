import { View } from 'react-native';
import { formatInTimeZone } from 'date-fns-tz';
import { IconText, AppText, DashedLine } from '@ui';
import { ICONS } from '@assets';
import { If } from '@components';
import { COLORS } from '@styles';
import { calculateEventDuration } from '../../../helpers';
import { styles } from './styles';
import { PaymentHistoryCardProps } from './types';

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'awaiting':
      return 'Awaiting settlement';
    case 'pending':
      return 'Awaiting review';
    case 'approved':
      return 'Approved';
    case 'paid':
      return 'Paid';
    default:
      return status;
  }
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'paid':
      return COLORS.green;
    case 'approved':
      return COLORS.main;
    default:
      return COLORS.yellow;
  }
};

const getStatusTextColor = (status: string): string => {
  switch (status) {
    case 'paid':
      return COLORS.green;
    case 'approved':
      return COLORS.main;
    default:
      return COLORS.orange;
  }
};

export const PaymentHistoryCard = ({ event }: PaymentHistoryCardProps) => {
  const timezone = event.location?.timezone || 'UTC';

  const startAt = event.start_at
    ? formatInTimeZone(event.start_at, timezone, 'dd MMM, yyyy')
    : '';

  const eventDuration =
    event.start_at && event.end_at
      ? calculateEventDuration(event.start_at, event.end_at)
      : { formatted: '' };

  const payoutDollars = (event.payout_amount_cents / 100).toFixed(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(event.payout_status) + '1A' },
          ]}
        >
          <AppText
            typography="bold_12"
            style={{ color: getStatusTextColor(event.payout_status) }}
          >
            {getStatusLabel(event.payout_status)}
          </AppText>
        </View>
      </View>

      <DashedLine strokeDasharray="3 3" />
      <View style={styles.footer}>
        <View style={styles.footerContent}>
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

          <If condition={!!event.payment_amount}>
            <IconText
              icon={ICONS.moneyBag('main')}
              text={`$${event.payment_amount} · ${
                event.payment_mode === 'per_hour' ? 'Per hour' : 'Fixed price'
              }`}
              textProps={{ typography: 'medium_12', color: 'gray_primary' }}
              iconSize={14}
            />
          </If>
        </View>

        <AppText typography="bold_14" color="main">
          {`$${payoutDollars}`}
        </AppText>
      </View>
    </View>
  );
};
