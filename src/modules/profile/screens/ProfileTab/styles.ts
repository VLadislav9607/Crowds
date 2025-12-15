import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    height: 58,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray,
  },
});
