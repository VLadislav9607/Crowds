import { StyleSheet } from 'react-native';
import { COLORS, ColorsKeys, TypographyKeysType } from '@styles';
import { AvatarFlag, AvatarSize } from './types';

export const AVATAR_TYPOGRAPHY: Record<AvatarSize, TypographyKeysType> = {
  20: 'bold_8',
  24: 'bold_10',
  32: 'bold_12',
  40: 'bold_14',
  48: 'bold_16',
  56: 'bold_18',
  64: 'bold_20',
  80: 'bold_24',
  148: 'bold_32',
};

export const AVATAR_FLAG_COLOR: Record<AvatarFlag, ColorsKeys> = {
  green: 'green',
  red: 'red',
  yellow: 'yellow',
  black: 'black',
};

export const AVATAR_FLAG_SIZE: Record<
  AvatarSize,
  { container: number; indicator: number }
> = {
  20: { container: 7, indicator: 5 },
  24: { container: 8, indicator: 6 },
  32: { container: 10, indicator: 7 },
  40: { container: 11, indicator: 8 },
  48: { container: 13, indicator: 10 },
  56: { container: 15, indicator: 11 },
  64: { container: 17, indicator: 13 },
  80: { container: 20, indicator: 15 },
  148: { container: 28, indicator: 22 },
};

export const styles = StyleSheet.create({
  avatar: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    overflow: 'hidden',
  },
  placeholder: {
    backgroundColor: '#F2F0F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#12051F',
  },
  flagContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  flag: {
    borderRadius: 50,
  },
});
