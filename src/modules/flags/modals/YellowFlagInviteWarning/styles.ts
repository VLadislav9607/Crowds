import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    gap: 20,
  },
  noticeCard: {
    backgroundColor: COLORS.yellow + '20',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.yellow,
  },
  message: {
    lineHeight: 22,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    alignItems: 'baseline',
  },
  label: {
    lineHeight: 20,
    marginTop: 12,
  },
  labelFirst: {
    marginTop: 0,
  },
  value: {
    lineHeight: 20,
    flex: 1,
  },
  expiresRow: {
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.light_gray2,
  },
  question: {
    lineHeight: 22,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionItem: {
    flex: 1,
  },
});
