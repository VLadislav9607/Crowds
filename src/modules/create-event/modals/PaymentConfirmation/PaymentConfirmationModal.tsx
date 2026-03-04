import { forwardRef, useState } from 'react';
import { View } from 'react-native';
import { AppModal } from '@components';
import { AppButton, AppText } from '@ui';
import { useImperativeModal } from '@hooks';
import {
  PaymentConfirmationModalRef,
  PaymentConfirmationOpenData,
} from './types';
import { styles } from './styles';

const formatCents = (cents: number): string => {
  return `$${(cents / 100).toFixed(2)}`;
};

interface PaymentConfirmationModalProps {
  onModalHide?: () => void;
}

export const PaymentConfirmationModal = forwardRef<
  PaymentConfirmationModalRef,
  PaymentConfirmationModalProps
>(({ onModalHide }, ref) => {
  const { isVisible, close, refProps } =
    useImperativeModal<PaymentConfirmationOpenData>(ref);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await refProps.onConfirm(refProps);
    } finally {
      setIsLoading(false);
    }
  };

  const rateLabel =
    refProps.paymentMode === 'per_hour' ? '/hr per talent' : '/talent (flat)';

  return (
    <AppModal
      title="Payment Summary"
      subtitle="Review the cost breakdown before publishing."
      isVisible={isVisible}
      onClose={close}
      onModalHide={onModalHide}
    >
      <View style={styles.breakdown}>
        {refProps.paymentAmountPerUnit != null && (
          <View style={styles.row}>
            <AppText typography="regular_14" color="black_60">
              Rate
            </AppText>
            <AppText typography="bold_14" color="black">
              {formatCents(refProps.paymentAmountPerUnit)}
              {rateLabel}
            </AppText>
          </View>
        )}

        <View style={styles.row}>
          <AppText typography="regular_14" color="black_60">
            Total headcount
          </AppText>
          <AppText typography="bold_14" color="black">
            {refProps.totalHeadcount}
          </AppText>
        </View>

        {refProps.eventDurationHours != null && (
          <View style={styles.row}>
            <AppText typography="regular_14" color="black_60">
              Duration
            </AppText>
            <AppText typography="bold_14" color="black">
              {refProps.eventDurationHours.toFixed(1)}h
            </AppText>
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.row}>
          <AppText typography="regular_14" color="black_60">
            Talent budget
          </AppText>
          <AppText typography="bold_14" color="black">
            {formatCents(refProps.talentBudgetCents)}
          </AppText>
        </View>

        <View style={styles.row}>
          <AppText typography="regular_14" color="black_60">
            Crowds commission (20%)
          </AppText>
          <AppText typography="bold_14" color="black">
            {formatCents(refProps.commissionCents)}
          </AppText>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <AppText typography="bold_16" color="black">
            Total charge
          </AppText>
          <AppText typography="bold_16" color="black">
            {formatCents(refProps.totalChargeCents)}
          </AppText>
        </View>
      </View>

      <AppButton
        title="Pay & Publish"
        size="60"
        onPress={handleConfirm}
        isLoading={isLoading}
        wrapperStyles={styles.buttonWrapper}
      />
      <AppButton
        title="Cancel"
        variant="withBorder"
        size="60"
        onPress={close}
        isDisabled={isLoading}
        wrapperStyles={styles.cancelButton}
      />
    </AppModal>
  );
});
