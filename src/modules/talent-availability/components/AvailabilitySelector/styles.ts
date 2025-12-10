import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.light_gray3,
    backgroundColor: COLORS.white,
    gap: 10,
  },
  cardSelected: {
    borderColor: COLORS.main,
    backgroundColor: COLORS.light_purple,
  },
});
