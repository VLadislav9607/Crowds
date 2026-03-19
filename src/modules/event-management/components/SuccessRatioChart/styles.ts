import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@styles';

export const styles = StyleSheet.create({
  chartCard: {
    backgroundColor: COLORS.gray_100,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  chartLabel: {
    ...TYPOGRAPHY.regular_12,
    color: COLORS.grayscale_500,
  },
  legendContainer: {
    gap: 12,
    paddingHorizontal: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    ...TYPOGRAPHY.bold_14,
    color: COLORS.black,
  },
});
