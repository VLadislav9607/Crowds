import { styles } from './styles';
import { ButtonSize } from './types';

export const ICON_SIZES: Record<ButtonSize, number> = {
  '60': 28,
  '56': 24,
  '50': 20,
  '40': 20,
  '37': 20,
  '31': 20,
  '28': 14,
};

export const LOADING_SIZES: Record<ButtonSize, number> = {
  '60': 28,
  '56': 24,
  '50': 22,
  '40': 20,
  '37': 20,
  '31': 16,
  '28': 14,
};

export const VARIANTS = {
  primary: {
    buttonStyles: styles.primaryButton,
    textStyles: styles.primaryText,
    disabledButton: styles.primaryDisabledButton,
    disabledText: styles.primaryDisabledText,
  },
  withBorder: {
    buttonStyles: styles.withBorderButton,
    textStyles: styles.withBorderText,
    disabledButton: styles.withBorderDisabledButton,
    disabledText: styles.withBorderDisabledText,
  },
};

export const SIZES = {
  '60': {
    buttonSizeStyle: styles.button60,
    textSizeStyles: styles.button60Text,
  },
  '56': {
    buttonSizeStyle: styles.button56,
    textSizeStyles: styles.button56Text,
  },
  '50': {
    buttonSizeStyle: styles.button50,
    textSizeStyles: styles.button50Text,
  },
  '40': {
    buttonSizeStyle: styles.button40,
    textSizeStyles: styles.button40Text,
  },
  '37': {
    buttonSizeStyle: styles.button37,
    textSizeStyles: styles.button37Text,
  },
  '32': {
    buttonSizeStyle: styles.button32,
    textSizeStyles: styles.button32Text,
  },
  '31': {
    buttonSizeStyle: styles.button31,
    textSizeStyles: styles.button31Text,
  },
  '28': {
    buttonSizeStyle: styles.button28,
    textSizeStyles: styles.button28Text,
  },
};
