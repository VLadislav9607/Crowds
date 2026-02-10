import { TouchableOpacity, View } from 'react-native';
import { AppModalProps } from './types';
import Modal from 'react-native-modal';
import { styles } from './styles';
import { SvgXml } from 'react-native-svg';
import { ICONS } from '@assets';
import { AppText } from '@ui';
import { If } from '../If';
import { AppToast } from '../AppToast';

export const AppModal = ({
  children,
  title,
  subtitle,
  titleProps,
  subtitleProps,
  hideCloseButton,
  contentContainerStyle,
  hideToast,
  ...props
}: AppModalProps) => {
  return (
    <Modal onBackdropPress={props.onClose} backdropOpacity={0.5} {...props}>
      <If condition={!hideToast}>
        <AppToast removeTopOffset />
      </If>
      <View
        style={[
          styles.container,
          hideCloseButton && styles.containerWithoutCloseButton,
          contentContainerStyle,
        ]}
      >
        <If condition={!hideCloseButton && !!props.onClose}>
          <TouchableOpacity style={styles.closeButton} onPress={props.onClose}>
            <SvgXml xml={ICONS.closeIcon('black_50')} width={11} height={11} />
          </TouchableOpacity>
        </If>

        {title && (
          <AppText
            color="black"
            typography="bold_20"
            {...titleProps}
            style={[styles.title, titleProps?.style]}
          >
            {title}
          </AppText>
        )}
        {subtitle && (
          <AppText
            color="black_60"
            typography="regular_12"
            {...subtitleProps}
            style={[styles.subtitle, subtitleProps?.style]}
          >
            {subtitle}
          </AppText>
        )}

        {children}
      </View>
    </Modal>
  );
};
