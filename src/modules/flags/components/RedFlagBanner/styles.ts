import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  noticeCard: {
    backgroundColor: COLORS.red_light,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.red,
  },
  message: {
    lineHeight: 22,
  },
  label: {
    lineHeight: 20,
    marginTop: 12,
  },
  value: {
    lineHeight: 20,
  },
  expiresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    alignItems: 'baseline',
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.light_gray2,
  },
  skeletonCard: {
    backgroundColor: COLORS.red_light,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.red,
  },
  skeletonRow: {
    marginTop: 12,
  },
});
