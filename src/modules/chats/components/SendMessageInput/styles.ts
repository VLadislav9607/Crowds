import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 52,
    padding: 16,
    borderRadius: 104,
    backgroundColor: COLORS.white,
    color: COLORS.typography_black,
    fontSize: 14,
    fontFamily: FONTS.Inter_400,
    boxShadow: '0px 3.12px 31.2px 0px #5359901A',
  },
});
