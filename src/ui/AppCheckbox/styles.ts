import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    borderColor: COLORS.ligth_primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleChecked: {
    backgroundColor: COLORS.ligth_primary,
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
