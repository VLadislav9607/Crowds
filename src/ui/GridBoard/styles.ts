import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@styles';

const GAP = 10;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    marginBottom: 24,
  },
  eventItem: {
    width: `${(100 - GAP / 2) / 2}%` as any,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  eventItemSubTitle: {
    ...TYPOGRAPHY.regular_9,
    color: COLORS.black_50,
    marginTop: 2,
  },
  eventItemTitle: {
    ...TYPOGRAPHY.medium_13,
  },
  eventItemCount: {
    ...TYPOGRAPHY.bold_30,
    marginTop: 'auto',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  label: {
    ...TYPOGRAPHY.medium_10,
    textTransform: 'uppercase',
  },
});
