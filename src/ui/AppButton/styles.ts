import { StyleSheet } from 'react-native';

import { COLORS, TYPOGRAPHY } from '@styles';

export const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    paddingHorizontal: 24,
    borderRadius: 50,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  mainTextStyles: {
    ...TYPOGRAPHY.bold_16,
  },
  // Primary
  primaryButton: {
    backgroundColor: COLORS.main,
  },
  primaryText: {
    color: COLORS.white,
  },
  primaryDisabledButton: {
    backgroundColor: COLORS.gray,
  },
  primaryDisabledText: {
    color: COLORS.gray,
  },
  // With Border
  withBorderButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  withBorderText: {
    color: COLORS.white,
  },
  withBorderDisabledButton: {},
  withBorderDisabledText: {
    color: COLORS.gray,
  },

  // Sizes
  button60: {
    height: 60,
  },
  button60Text: {
    ...TYPOGRAPHY.bold_18,
  },
  button56: {
    height: 56,
  },
  button56Text: {
    ...TYPOGRAPHY.bold_18,
  },
  button50: {
    height: 50,
  },
  button50Text: {
    ...TYPOGRAPHY.bold_18,
  },
  button40: {
    height: 40,
    paddingHorizontal: 20,
  },
  button40Text: {
    ...TYPOGRAPHY.bold_16,
  },
  button37: {
    height: 37,
  },
  button37Text: {
    ...TYPOGRAPHY.bold_14,
    letterSpacing: -0.01,
  },
  button32: {
    height: 32,
    paddingHorizontal: 16,
  },
  button32Text: {
    ...TYPOGRAPHY.bold_12,
  },
  button31: {
    height: 31,
  },
  button31Text: {
    ...TYPOGRAPHY.bold_12,
  },
  button28: {
    height: 28,
  },
  button28Text: {
    ...TYPOGRAPHY.bold_12,
  },

  iconWrapper: {},
  textWrapper: {},
});
