import { ImageStyle } from '@d11/react-native-fast-image';
import { ImageRequireSource, StyleProp, ViewStyle } from 'react-native';
import { BucketsTypes } from '@configs';

export interface AppImageProps {
  containerStyle?: StyleProp<ViewStyle>;
  imgPath?: string | null;
  style?: StyleProp<ImageStyle>;
  bucket: BucketsTypes;
  placeholderImage?: ImageRequireSource;
  placeholderIcon?: string;
  placeholderIconSize?: number;
  showSkeleton?: boolean;
  CustomElements?: React.ReactNode;
  onPress?: () => void;
}
