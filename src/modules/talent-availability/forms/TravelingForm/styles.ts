import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    marginTop: -16,
    gap: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.light_gray3,
    paddingBottom: 24,
    borderTopColor: 'transparent',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  dateInput: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.light_gray2,
    marginVertical: 8,
    marginHorizontal: -16,
  },
  daysSection: {
    gap: 12,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.light_gray3,
  },
  dayDate: {
    flex: 1,
  },
  daySelector: {
    flex: 1.5,
  },
});
