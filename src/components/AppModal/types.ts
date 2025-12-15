import { AppTextProps } from '@ui';
import { ModalProps } from 'react-native-modal';
import { StyleProp } from 'react-native';
import { ViewStyle } from 'react-native';

export interface AppModalProps extends Partial<ModalProps> {
  title?: string;
  subtitle?: string;
  titleProps?: Partial<AppTextProps>;
  subtitleProps?: Partial<AppTextProps>;
  hideCloseButton?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  onClose: () => void;
}
