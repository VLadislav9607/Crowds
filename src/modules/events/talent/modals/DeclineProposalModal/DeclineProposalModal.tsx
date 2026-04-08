import { AppModal } from '@components';
import { AppButton, AppText } from '@ui';
import { DeclineProposalModalProps } from './types';
import { styles } from './styles';

export const DeclineProposalModal = ({
  isVisible,
  onClose,
  onConfirm,
  isLoading,
}: DeclineProposalModalProps) => {
  return (
    <AppModal title="Decline proposal" isVisible={isVisible} onClose={onClose}>
      <AppText
        typography="regular_16"
        color="black"
        margin={{ bottom: 10, top: 20 }}
      >
        Are you sure you want to decline this proposal?
      </AppText>
      <AppText typography="regular_16" color="black" margin={{ bottom: 20 }}>
        This action cannot be undone. You will lose this opportunity.
      </AppText>

      <AppButton
        title="Yes, decline"
        mb={10}
        size="60"
        wrapperStyles={styles.declineButton}
        onPress={onConfirm}
        isLoading={isLoading}
        isDisabled={isLoading}
      />
      <AppButton
        title="No, go back"
        variant="withBorder"
        size="60"
        onPress={onClose}
        isDisabled={isLoading}
      />
    </AppModal>
  );
};
