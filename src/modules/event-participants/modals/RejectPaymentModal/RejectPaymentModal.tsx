import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { AppModal } from '@components';
import { AppButton, AppTextarea } from '@ui';
import { RejectPaymentModalProps } from './types';
import { styles } from './styles';

export const RejectPaymentModal = ({
  isVisible,
  onClose,
  onConfirm,
  isLoading,
}: RejectPaymentModalProps) => {
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (!isVisible) setReason('');
  }, [isVisible]);

  const handleConfirm = () => {
    onConfirm(reason.trim() || undefined);
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  return (
    <AppModal
      isVisible={isVisible}
      onClose={handleClose}
      title="Reject Payment"
      subtitle="Are you sure? This talent will not receive payment for this event. This action cannot be undone."
      subtitleProps={{ typography: 'regular_16', margin: { top: 5 } }}
    >
      <AppTextarea
        placeholder="Reason (optional)"
        value={reason}
        onChangeText={setReason}
        multiline
        numberOfLines={3}
      />
      <View style={styles.buttons}>
        <AppButton
          title="Cancel"
          variant="withBorder"
          size="50"
          onPress={handleClose}
          isDisabled={isLoading}
          wrapperStyles={styles.btn}
        />
        <AppButton
          title="Reject"
          size="50"
          onPress={handleConfirm}
          isLoading={isLoading}
          wrapperStyles={styles.rejectBtn}
        />
      </View>
    </AppModal>
  );
};
