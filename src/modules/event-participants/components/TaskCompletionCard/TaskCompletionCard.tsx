import { memo } from 'react';
import { Pressable, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { intervalToDuration } from 'date-fns';
import { TalentFlag } from '@modules/common';
import { AppCheckbox, AppText, Avatar } from '@ui';
import { ICONS } from '@assets';
import { styles } from './styles';
import {
  TaskCompletionCardProps,
  STATUS_CONFIG,
  PAYOUT_STATUS_CONFIG,
} from './types';

const formatDuration = (
  checkinAt: string | null,
  checkoutAt: string | null,
) => {
  if (!checkinAt || !checkoutAt) return '';
  const { hours = 0, minutes = 0 } = intervalToDuration({
    start: new Date(checkinAt),
    end: new Date(checkoutAt),
  });
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

export const TaskCompletionCard = memo(
  ({
    item,
    isSelected,
    isSettled,
    onToggleSelect,
    onViewPhoto,
    onReject,
  }: TaskCompletionCardProps) => {
    const isRejected = item.task_status === 'rejected';
    const duration = formatDuration(item.checked_in_at, item.checked_out_at);
    const statusConfig =
      STATUS_CONFIG[item.task_status] ?? STATUS_CONFIG.submitted;

    const payoutConfig = item.payout_status
      ? PAYOUT_STATUS_CONFIG[item.payout_status]
      : null;

    return (
      <Pressable
        style={[styles.card, isRejected && styles.cardRejected]}
        onPress={isSettled ? undefined : onToggleSelect}
        disabled={isSettled}
      >
        {!isSettled && (
          <AppCheckbox
            checked={isSelected}
            type="circle"
            color="main"
            disabled={isRejected}
            style={isRejected ? styles.disabledCheckbox : undefined}
          />
        )}

        <Avatar
          size={40}
          name={item.name}
          flag={(item.flag as TalentFlag) ?? TalentFlag.GREEN}
          imgPath={item.avatar_url}
          bucket="talents_avatars"
        />

        <View style={styles.infoColumn}>
          <AppText typography="semibold_14" numberOfLines={1}>
            {item.name}
          </AppText>
          <View style={styles.metaRow}>
            {isSettled && payoutConfig ? (
              <View
                style={[
                  styles.statusPill,
                  { backgroundColor: payoutConfig.bg },
                ]}
              >
                <AppText
                  typography="medium_9"
                  style={{ color: payoutConfig.color }}
                >
                  {payoutConfig.label}
                </AppText>
              </View>
            ) : (
              <View
                style={[
                  styles.statusPill,
                  { backgroundColor: statusConfig.bg },
                ]}
              >
                <AppText
                  typography="medium_9"
                  style={{ color: statusConfig.color }}
                >
                  {statusConfig.label}
                </AppText>
              </View>
            )}
            {!!duration && (
              <>
                <AppText typography="regular_10" color="gray_primary">
                  ·
                </AppText>
                <SvgXml
                  xml={ICONS.clockV2('gray_primary')}
                  width={12}
                  height={12}
                />
                <AppText typography="regular_12" color="gray_primary">
                  {duration}
                </AppText>
              </>
            )}
          </View>
        </View>

        {item.task_photo_path && (
          <Pressable
            hitSlop={8}
            onPress={() => onViewPhoto(item.task_photo_path!)}
          >
            <SvgXml xml={ICONS.image()} width={20} height={20} />
          </Pressable>
        )}

        {!isSettled && !isRejected && (
          <Pressable
            style={styles.rejectBtn}
            hitSlop={8}
            onPress={() => onReject(item.taskCompletionId)}
          >
            <SvgXml xml={ICONS.closeIcon('red', 1)} width={10} height={10} />
          </Pressable>
        )}
      </Pressable>
    );
  },
);
