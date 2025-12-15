import { StyleSheet } from 'react-native';
import { ColorsKeys, TypographyKeysType } from '@styles';
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

export const styles = StyleSheet.create({
  avatar: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    backgroundColor: '#F2F0F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#12051F',
  },
  flag: {
    position: 'absolute',
    top: 1,
    left: 1,
    width: 11,
    height: 11,
    borderRadius: 100,
    zIndex: 1,
  },
});
