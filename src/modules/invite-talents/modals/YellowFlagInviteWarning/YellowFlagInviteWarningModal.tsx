import { View } from 'react-native';
import { AppModal } from '@components';
import { AppText, AppButton } from '@ui';
import { formatDate } from '@utils';
import { FLAG_REASONS } from '../../../flags/components/FlagNotesList/types';

import { styles } from './styles';
import type { YellowFlagInviteWarningModalProps } from './types';

const getReasonLabel = (
  reason: string | null,
  description: string | null,
): string => {
  if (!reason && !description) return 'No reason provided';
  const mapped =
    reason && reason in FLAG_REASONS
      ? (FLAG_REASONS as Record<string, string>)[reason]
      : reason;
  if (mapped && description) return `${mapped}. ${description}`;
  return mapped || description || 'No reason provided';
};

const DEFAULT_QUESTION = 'Would you like to continue booking them anyway?';
const DEFAULT_CONFIRM_LABEL = 'Invite';

export const YellowFlagInviteWarningModal = ({
  isVisible,
  flag,
  onClose,
  onConfirm,
  isInviting = false,
  confirmLabel = DEFAULT_CONFIRM_LABEL,
  questionText = DEFAULT_QUESTION,
}: YellowFlagInviteWarningModalProps) => {
  if (!flag) return null;

  const durationText =
    flag.duration_days != null
      ? `${flag.duration_days} day${flag.duration_days === 1 ? '' : 's'}`
      : '';

  const message = durationText
    ? `This talent has received a suspension notice for ${durationText}.`
    : 'This talent has an active suspension notice.';

  const reasonLabel = getReasonLabel(flag.reason, flag.description);
  const expiresFormatted = flag.expires_on
    ? formatDate(flag.expires_on, 'MMM dd, yyyy')
    : null;

  return (
    <AppModal title="Suspension notice" isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.noticeCard}>
          <AppText typography="regular_14" style={styles.message}>
            {message}
          </AppText>

          <AppText
            typography="semibold_12"
            color="black_60"
            style={[styles.label, styles.labelFirst]}
          >
            Reason
          </AppText>
          <AppText typography="regular_14" style={styles.value}>
            {reasonLabel}
          </AppText>

          {expiresFormatted ? (
            <View style={[styles.expiresRow, styles.row]}>
              <AppText typography="semibold_12" color="black_60">
                Valid until{' '}
              </AppText>
              <AppText typography="regular_14">{expiresFormatted}</AppText>
            </View>
          ) : null}
        </View>

        <AppText
          typography="regular_14"
          color="black_60"
          style={styles.question}
        >
          {questionText}
        </AppText>

        <View style={styles.actions}>
          <View style={styles.actionItem}>
            <AppButton title="Cancel" variant="withBorder" onPress={onClose} />
          </View>
          <View style={styles.actionItem}>
            <AppButton
              title={confirmLabel}
              onPress={onConfirm}
              isLoading={isInviting}
            />
          </View>
        </View>
      </View>
    </AppModal>
  );
};
