import { COLORS, TYPOGRAPHY } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 32,
    paddingHorizontal: 4,
    position: 'relative',
    marginBottom: 16,
    gap: 4,
  },
  scrollContent: {
    flexDirection: 'row',
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
    borderWidth: 1,
    justifyContent: 'center',
    minWidth: 80,
    zIndex: 2,
  },
  firstTab: {
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  lastTab: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
  },
  slidingIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  tabText: {
    ...TYPOGRAPHY.bold_12,
  },
  badge: {
    height: 18,
    marginLeft: 8,
    paddingHorizontal: 5,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
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