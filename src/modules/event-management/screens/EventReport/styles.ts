import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 32,
    paddingHorizontal: 20,
    flexGrow: 1,
  },
  sectionTitle: {
    marginBottom: 20,
  },
  escrowCard: {
    backgroundColor: COLORS.gray_100,
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 28,
    gap: 8,
  },
  escrowAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  escrowCurrency: {
    marginBottom: 2,
  },
});
