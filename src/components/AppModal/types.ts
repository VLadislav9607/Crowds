import { AppTextProps } from '@ui';
import { ModalProps } from 'react-native-modal'

export interface AppModalProps extends Partial<ModalProps> {
    title?: string;
    subtitle?: string;
    titleProps?: Partial<AppTextProps>;
    subtitleProps?: Partial<AppTextProps>;
    onClose: () => void;

}