import { StyleSheet } from 'react-native';
import { TypographyKeysType } from '@styles';
import { AvatarSize } from './types';

export const AVATAR_TYPOGRAPHY: Record<AvatarSize, TypographyKeysType> = {
  20: 'bold_8',
  24: 'bold_10',
  32: 'bold_12',
  40: 'bold_14',
  48: 'bold_16',
  56: 'bold_18',
  64: 'bold_20',
  80: 'bold_24',
};

export const styles = StyleSheet.create({
  avatar: {
    overflow: 'hidden',
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
});
