import { StyleSheet } from 'react-native';
import { COLORS, SHADOWS } from '@styles';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 10,
    ...SHADOWS.card,
  },
  cardRejected: {
    opacity: 0.55,
  },
  infoColumn: {
    flex: 1,
    gap: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusPill: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  rejectBtn: {
    padding: 4,
  },
  disabledCheckbox: {
    opacity: 0.3,
  },
});
