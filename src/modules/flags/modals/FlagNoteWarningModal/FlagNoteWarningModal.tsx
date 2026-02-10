import { View } from 'react-native';
import { AppModal } from '@components';
import { AppText, AppButton } from '@ui';

import { styles } from './styles';
interface FlagNoteWarningModalProps {
  isVisible: boolean;
  title: string;
  note: string;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const FlagNoteWarningModal = ({
  isVisible,
  title,
  note,
  isLoading,
  onClose,
  onConfirm,
}: FlagNoteWarningModalProps) => {
  return (
    <AppModal title={title} isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <AppText typography="regular_14" style={styles.noteText}>
          {note}
        </AppText>
        <View style={styles.actions}>
          <View style={styles.actionItem}>
            <AppButton title="Cancel" variant="withBorder" onPress={onClose} />
          </View>
          <View style={styles.actionItem}>
            <AppButton
              title="Confirm"
              onPress={onConfirm}
              isLoading={isLoading}
            />
          </View>
        </View>
      </View>
    </AppModal>
  );
};
