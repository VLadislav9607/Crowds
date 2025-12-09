import { StyleProp, ViewStyle } from 'react-native';
import { IMAGES } from '@assets';
import { ColorsKeys } from '@styles';
import { SvgProps } from 'react-native-svg';

export type HeaderVariant =
  | 'withTitle'
  | 'withLogo'
  | 'withTitleAndImageBg'
  | 'withLogoAndImageBg';

export type HeaderImageBgType = 'purple' | 'crowd';

export const headerImageBgMap = {
  purple: IMAGES.headerPurpleBg,
  crowd: IMAGES.headerCrowdBg,
};

export interface IAppHeaderProps {
  title?: string;
  colorHeader?: ColorsKeys;
  headerVariant?: HeaderVariant;
  headerImageBg?: HeaderImageBgType;
  customElement?: React.ReactNode;
  logoProps?: Partial<SvgProps>;
  headerStyles?: StyleProp<ViewStyle>;
  rightIcons?: {
    icon: () => string | null;
    onPress: () => void;
  }[];
  goBackCallback?: () => void;
}
