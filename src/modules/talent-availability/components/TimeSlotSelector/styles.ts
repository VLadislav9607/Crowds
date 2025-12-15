import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.gray_bg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 0,
  },
  valueText: {
    color: COLORS.main,
  },
});
