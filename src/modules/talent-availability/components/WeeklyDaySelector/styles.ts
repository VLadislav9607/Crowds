import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  daysRow: {
    flexDirection: 'row',
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.light_gray3,
    borderRadius: 16,
    padding: 4,
  },
  day: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daySelected: {
    backgroundColor: COLORS.main,
  },
});
