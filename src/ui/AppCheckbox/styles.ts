import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    minHeight: 17,
    lineHeight: 17,
  },
  square: {
    borderWidth: 1,
    borderColor: COLORS.main,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    borderRadius: 100,
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderColor: COLORS.light_primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedIcon: {
    borderWidth: 1,
    borderColor: COLORS.dark_blue,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleChecked: {
    backgroundColor: COLORS.light_primary,
    width: 6,
    height: 6,
    borderRadius: 100,
  },
  squareChecked: {
    backgroundColor: COLORS.main,
    width: 8,
    height: 8,
  },
});
