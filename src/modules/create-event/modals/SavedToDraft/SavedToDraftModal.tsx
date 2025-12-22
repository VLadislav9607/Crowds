import { AppModal } from '@components';
import { AppButton } from '@ui';

interface SavedToDraftModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SavedToDraftModal = ({
  isVisible,
  onClose,
}: SavedToDraftModalProps) => {
  return (
    <AppModal
      title="Saved to Draft!"
      subtitle="Your event is saved as draft, you can edit & publish it anytime."
      titleProps={{
        typography: 'bold_24',
        style: { textAlign: 'center', marginBottom: 20 },
      }}
      subtitleProps={{
        typography: 'medium_20',
        color: 'black',
        style: { textAlign: 'center' },
      }}
      isVisible={isVisible}
      onClose={onClose}
    >
      <AppButton title="Go to Draft" mb={8} onPress={onClose} />
      <AppButton title="Okay" variant="withBorder" onPress={onClose} />
    </AppModal>
  );
};
