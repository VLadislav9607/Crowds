import { View, StyleSheet } from 'react-native';
import { AppButton } from '@ui';
import { COLORS } from '@styles';

interface CreateEventFooterProps {
  onCancel: () => void;
  onSaveDraft: () => void;
  onNext: () => void;
}

export const CreateEventFooter = ({
  onCancel,
  onSaveDraft,
  onNext,
}: CreateEventFooterProps) => {
  return (
    <View style={styles.footer}>
      <AppButton
        title="Cancel"
        variant="withBorder"
        onPress={onCancel}
        titleStyles={styles.buttonTitle}
      />
      <AppButton
        title="Save draft"
        variant="withBorder"
        onPress={onSaveDraft}
        titleStyles={styles.buttonTitle}
      />
      <AppButton title="Next" onPress={onNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  buttonTitle: {
    color: COLORS.black,
  },
});
