import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: COLORS.light_gray3,
    minHeight: 84,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectedContainer: {
    borderColor: COLORS.main,
    backgroundColor: COLORS.main10,
  },
  textContainer: {
    flex: 1,
  },
});
