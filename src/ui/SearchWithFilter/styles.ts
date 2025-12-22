import { StyleSheet } from 'react-native';
import { COLORS, SHADOWS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    height: 44,
    borderColor: COLORS.off_white,
    backgroundColor: COLORS.white,
    ...SHADOWS.field,
  },
});

