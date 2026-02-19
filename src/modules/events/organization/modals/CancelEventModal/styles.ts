import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: COLORS.red,
    marginTop: 8,
  },
  warningContainer: {
    backgroundColor: COLORS.red_light,
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    marginBottom: 20,
  },
  textareaInput: {
    height: 70,
  },
  textarea: {
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
