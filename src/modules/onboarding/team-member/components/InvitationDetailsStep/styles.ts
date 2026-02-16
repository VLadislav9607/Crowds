import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  detailsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  detailRow: {
    gap: 4,
  },
  buttonsContainer: {
    marginTop: 24,
    gap: 16,
  },
  declineButtonTitle: {
    color: COLORS.black,
  },
});
