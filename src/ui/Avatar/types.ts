import { TalentFlag } from '@modules/common';
import { BucketsTypes } from '@configs';
import { StyleProp, ViewStyle } from 'react-native';

export type AvatarSize = 20 | 24 | 32 | 40 | 48 | 56 | 64 | 80 | 148;

export type AvatarFlag = TalentFlag;

export interface IAvatarProps {
  size?: AvatarSize;
  /** Direct URL (legacy) */
  uri?: string;
  /** Path in bucket (for AppImage) */
  imgPath?: string;
  /** Bucket name (required when using imgPath) */
  bucket?: BucketsTypes;
  name?: string;
  flag?: AvatarFlag;
  style?: StyleProp<ViewStyle>;
}
