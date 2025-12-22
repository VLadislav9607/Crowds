import { AppModal, AppModalProps } from '@components';
import { AppButton, AppText } from '@ui';

import { styles } from './styles';

interface IProps extends AppModalProps {
  onStartVerification: () => void;
}

export const VerificationDataNoticeModal = ({
  isVisible,
  onClose,
  onStartVerification,
}: IProps) => {
  return (
    <AppModal
      onClose={onClose}
      isVisible={isVisible}
      title="Verification Data Notice"
    >
      <AppText style={styles.description}>
        Crowds Now does not store your ID documents. Only your First Name and
        Date of Birth are kept for verification.
      </AppText>

      <AppText style={styles.warningText}>
        If these details are fabricated or altered from a valid ID, your account
        may be banned.
      </AppText>

      <AppButton title="Agree & Continue" onPress={onStartVerification} />
    </AppModal>
  );
};
