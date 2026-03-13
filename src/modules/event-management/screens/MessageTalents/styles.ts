import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@styles';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  messageButton: {
    backgroundColor: COLORS.main10,
    gap: 6,
  },
  messageButtonText: {
    color: COLORS.black,
    ...TYPOGRAPHY.regular_12,
  },
});
