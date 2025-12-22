import { StyleSheet } from 'react-native';
import { COLORS, SHADOWS, TYPOGRAPHY } from '@styles';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderWidth: 1,
    borderColor: COLORS.off_white,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: COLORS.white,
    ...SHADOWS.field,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    height: 18,
    minWidth: 18,
    borderRadius: 10,
    backgroundColor: COLORS.main,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    ...TYPOGRAPHY.bold_12,
    color: COLORS.white,
    lineHeight: 14,
  },
  active: {
    borderWidth: 2,
    borderColor: COLORS.main,
  },
});
