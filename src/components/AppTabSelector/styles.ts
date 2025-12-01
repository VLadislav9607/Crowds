import { COLORS, TYPOGRAPHY } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 32,
    paddingHorizontal: 4,
    position: 'relative',
    marginBottom: 16,
  },
  scrollContent: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    height: 32,
    borderRadius: 32,
    paddingHorizontal: 4,
    position: 'relative',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 32,
    justifyContent: 'center',
    zIndex: 1,
    minWidth: 80,
  },
  slidingIndicator: {
    position: 'absolute',
    backgroundColor: COLORS.black,
    borderRadius: 32,
    top: 2,
    bottom: 2,
  },
  tabText: {
    ...TYPOGRAPHY.bold_12,
  },
  label: {
    ...TYPOGRAPHY.h4_mob,
    marginBottom: 16,
  },
  badgeLabel: {
    ...TYPOGRAPHY.regular_16,
    color: COLORS.grayscale_500,
  },
});
