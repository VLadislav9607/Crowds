import { View } from 'react-native';
import { AppModal } from '@components';
import { AppButton } from '@ui';
import { RejectTaskModalProps } from './types';
import { styles } from './styles';

export const RejectTaskModal = ({
  isVisible,
  onClose,
  onConfirm,
}: RejectTaskModalProps) => {
  return (
    <AppModal
      isVisible={isVisible}
      onClose={onClose}
      title="Reject Task"
      subtitle="Are you sure you want to reject this task? This action cannot be undone."
      subtitleProps={{ typography: 'regular_16', margin: { top: 5 } }}
    >
      <View style={styles.buttons}>
        <AppButton
          title="Cancel"
          variant="withBorder"
          size="50"
          onPress={onClose}
          wrapperStyles={styles.btn}
        />
        <AppButton
          title="Reject"
          size="50"
          onPress={onConfirm}
          wrapperStyles={styles.rejectBtn}
        />
      </View>
    </AppModal>
  );
};
