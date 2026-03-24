import { View } from 'react-native';
import { AppModal } from '@components';
import { AppButton, AppText } from '@ui';
import { SettlementConfirmModalProps } from './types';
import { styles } from './styles';

const formatCents = (cents: number): string => {
  return `$${(cents / 100).toFixed(2)}`;
};

export const SettlementConfirmModal = ({
  isVisible,
  onClose,
  onConfirm,
  isLoading,
  preview,
}: SettlementConfirmModalProps) => {
  return (
    <AppModal
      title="Settlement Summary"
      subtitle="Review the settlement breakdown before confirming."
      isVisible={isVisible}
      onClose={onClose}
    >
      <View style={styles.breakdown}>
        <View style={styles.row}>
          <AppText typography="regular_14" color="black_60">
            Amount paid at creation
          </AppText>
          <AppText typography="bold_14" color="black">
            {formatCents(preview.totalChargeCents)}
          </AppText>
        </View>

        <View style={styles.row}>
          <AppText typography="regular_14" color="black_60">
            Stripe processing fee
          </AppText>
          <AppText typography="bold_14" color="black">
            -{formatCents(preview.stripeFeeCents)}
          </AppText>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <AppText typography="regular_14" color="black_60">
            Transfer to {preview.selectedCount} talent
            {preview.selectedCount !== 1 ? 's' : ''}
          </AppText>
          <AppText typography="bold_14" color="black">
            -{formatCents(preview.talentPayoutCents)}
          </AppText>
        </View>

        <View style={styles.row}>
          <AppText typography="regular_14" color="black_60">
            Platform commission (Crowds)
          </AppText>
          <AppText typography="bold_14" color="black">
            -{formatCents(preview.crowdsEarnings)}
          </AppText>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <AppText typography="bold_16" color="black">
            Refund to you
          </AppText>
          <AppText typography="bold_16" color="black">
            {formatCents(preview.refundCents)}
          </AppText>
        </View>
      </View>

      <View style={styles.warningBox}>
        <AppText typography="regular_14" color="red">
          This action is irreversible. Talents will receive their payments and
          any unused budget will be refunded to your account.
        </AppText>
      </View>

      <View style={styles.buttons}>
        <AppButton
          title="Cancel"
          variant="withBorder"
          size="50"
          onPress={onClose}
          isDisabled={isLoading}
          wrapperStyles={styles.btn}
        />
        <AppButton
          title="Confirm"
          size="50"
          onPress={onConfirm}
          isLoading={isLoading}
          wrapperStyles={styles.btn}
        />
      </View>
    </AppModal>
  );
};
