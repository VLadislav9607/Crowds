import { StyleProp, ViewStyle } from 'react-native';

export type AvatarSize = 20 | 24 | 32 | 40 | 48 | 56 | 64 | 80;

export interface IAvatarProps {
  size?: AvatarSize;
  uri?: string;
  name?: string;
  style?: StyleProp<ViewStyle>;
}
