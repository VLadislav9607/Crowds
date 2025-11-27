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
    paddingVertical: 19,
  },
  button60Text: {
    ...TYPOGRAPHY.bold_18,
  },
  button56: {
    height: 56,
    paddingVertical: 17,
  },
  button56Text: {
    ...TYPOGRAPHY.bold_18,
  },
  button50: {
    height: 50,
    paddingVertical: 14,
  },
  button50Text: {
    ...TYPOGRAPHY.bold_18,
  },
  button40: {
    height: 40,
    paddingVertical: 12.5,
    paddingHorizontal: 20,
  },
  button40Text: {
    ...TYPOGRAPHY.bold_12,
  },
  button37: {
    height: 37,
    paddingVertical: 10,
  },
  button37Text: {
    ...TYPOGRAPHY.bold_14,
    letterSpacing: -0.01,
  },
  button32: {
    height: 32,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  button32Text: {
    ...TYPOGRAPHY.bold_12,
  },
  button31: {
    height: 31,
    paddingVertical: 8,
  },
  button31Text: {
    ...TYPOGRAPHY.bold_12,
  },
  button28: {
    height: 28,
    paddingVertical: 6.5,
  },
  button28Text: {
    ...TYPOGRAPHY.bold_12,
  },

  iconWrapper: {},
  textWrapper: {},
});
