import { FONTS } from './fonts';

const createStyle = (
  fontFamily: string,
  size: number,
  lineHeight?: number,
) => ({
  fontFamily,
  fontSize: size,
  lineHeight: lineHeight ? lineHeight : size * 1.22,
  letterSpacing: 0,
});

export const TYPOGRAPHY = {
  // HEADINGS
  h1: createStyle(FONTS.Inter_700, 32),
  h1_mob: createStyle(FONTS.Inter_600, 28, 36),
  h2: createStyle(FONTS.Inter_700, 28),
  h3: createStyle(FONTS.Inter_700, 24),
  h3_mob: createStyle(FONTS.Inter_600, 20, 28),
  h4: createStyle(FONTS.Inter_700, 20),
  h4_mob: createStyle(FONTS.Inter_500, 18, 24),
  h5: createStyle(FONTS.Inter_700, 18),
  h5_mob: createStyle(FONTS.Inter_600, 16, 20),
  h6: createStyle(FONTS.Inter_700, 16),

  // TEXT
  extra_bold_26: createStyle(FONTS.Inter_800, 26),
  extra_bold_22: createStyle(FONTS.Inter_800, 22, 24),
  extra_bold_18: createStyle(FONTS.Inter_800, 18),

  bold_40: createStyle(FONTS.Inter_700, 42),
  bold_32: createStyle(FONTS.Inter_700, 32),
  bold_30: createStyle(FONTS.Inter_700, 30, 32),
  bold_24: createStyle(FONTS.Inter_700, 24),
  bold_20: createStyle(FONTS.Inter_700, 20),
  bold_18: createStyle(FONTS.Inter_700, 18),
  bold_16: createStyle(FONTS.Inter_700, 16),
  bold_14: createStyle(FONTS.Inter_700, 14),
  bold_12: createStyle(FONTS.Inter_700, 12),
  bold_10_4: createStyle(FONTS.Inter_700, 10.4),
  bold_10: createStyle(FONTS.Inter_700, 10),
  bold_9: createStyle(FONTS.Inter_700, 9),
  bold_8: createStyle(FONTS.Inter_700, 8),

  semibold_20: createStyle(FONTS.Inter_600, 20),
  semibold_18: createStyle(FONTS.Inter_600, 18),
  semibold_16: createStyle(FONTS.Inter_600, 16),
  semibold_14: createStyle(FONTS.Inter_600, 14),
  semibold_12: createStyle(FONTS.Inter_600, 12),
  semibold_10: createStyle(FONTS.Inter_600, 10),
  semibold_8: createStyle(FONTS.Inter_600, 8),

  medium_20: createStyle(FONTS.Inter_500, 20, 28),
  medium_16: createStyle(FONTS.Inter_500, 16),
  medium_14: createStyle(FONTS.Inter_500, 14),
  medium_13: createStyle(FONTS.Inter_500, 13),
  medium_12: createStyle(FONTS.Inter_500, 12),
  medium_10_4: createStyle(FONTS.Inter_500, 10.4),
  medium_10: createStyle(FONTS.Inter_500, 10),
  medium_9: createStyle(FONTS.Inter_500, 9),
  medium_8: createStyle(FONTS.Inter_500, 8),

  regular_18: createStyle(FONTS.Inter_400, 18),
  regular_16: createStyle(FONTS.Inter_400, 16),
  regular_14: createStyle(FONTS.Inter_400, 14),
  regular_12: createStyle(FONTS.Inter_400, 12),
  regular_10: createStyle(FONTS.Inter_400, 10),
  regular_9: createStyle(FONTS.Inter_400, 9),
  regular_8: createStyle(FONTS.Inter_400, 8),
};

export type TypographyKeysType = keyof typeof TYPOGRAPHY;
