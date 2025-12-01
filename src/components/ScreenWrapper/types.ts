import { StyleProp, ViewStyle } from 'react-native';
import { ColorsKeys } from '@styles';

export type HeaderVariant =
  | 'withTitle'
  | 'withLogo'
  | 'withTitleAndImageBg'
  | 'withLogoAndImageBg';

export type HeaderImageBgType = 'purple' | 'crowd';

export interface IScreenWrapperProps {
  children: React.ReactNode;
  title?: string;
  colorHeader?: ColorsKeys;
  headerVariant?: HeaderVariant;
  headerImageBg?: HeaderImageBgType;
  customElement?: React.ReactNode;
  headerStyles?: StyleProp<ViewStyle>;
  goBackCallback?: () => void;
}
