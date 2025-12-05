import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  selectItem: {
    height: 44,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  underline: {
    height: 1,
    backgroundColor: COLORS.gray,
  },
});
