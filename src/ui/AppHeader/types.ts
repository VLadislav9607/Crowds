import { StyleProp, TextProps, ViewStyle } from 'react-native';
import { IMAGES } from '@assets';
import { ColorsKeys } from '@styles';
import { SvgProps } from 'react-native-svg';
import { AppTextProps } from '../AppText';

export type HeaderVariant =
  | 'empty'
  | 'withTitle'
  | 'withLogo'
  | 'withTitleCenter'
  | 'withTitleAndImageBg'
  | 'withLogoAndImageBg';

export type HeaderImageBgType = 'purple' | 'crowd';

export const headerImageBgMap = {
  purple: IMAGES.headerPurpleBg,
  crowd: IMAGES.headerCrowdBg,
};

export interface HeaderContentProps {
  title?: string;
  showBackButton?: boolean;
  avatarUrl?: string;
  titleProps?: TextProps;
  onBackPress?: () => void;
}

export interface IAppHeaderProps {
  title?: string;
  titleProps?: Partial<AppTextProps>;
  colorHeader?: ColorsKeys;
  showBackButton?: boolean;
  avatarUrl?: string;
  headerVariant?: HeaderVariant;
  headerImageBg?: HeaderImageBgType;
  customElement?: React.ReactNode;
  logoProps?: Partial<SvgProps>;
  headerStyles?: StyleProp<ViewStyle>;
  rightIcons?: {
    icon: () => string | null;
    onPress: () => void;
    size?: number;
  }[];
  goBackCallback?: () => void;
}
