import { StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@styles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 14,
  },
  slider: {
    height: 40,
  },
  rail: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.gray,
  },
  railSelected: {
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.main,
  },
  thumb: {
    width: 12,
    height: 12,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.main,
    backgroundColor: COLORS.white,
  },
  value: {
    ...TYPOGRAPHY.bold_12,
    top: 50,
    color: COLORS.dark_gray,
  },
  label: {
    ...TYPOGRAPHY.h5,
    marginBottom: 14,
  },
});
