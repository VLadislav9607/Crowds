import { TextInput, View } from 'react-native';
import { COLORS } from '@styles';
import { AppText } from '../AppText';
import { AppTextareaProps } from './types';
import { styles } from './styles';

export const AppTextarea = ({
  label,
  errorMessage,
  style,
  labelProps,
  containerStyle,
  errorMessageProps,
  labelContainerStyle,
  optional,
  ...props
}: AppTextareaProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={[styles.labelContainer, labelContainerStyle]}>
          <AppText
            color={props.disabled ? 'black_40' : 'black'}
            typography="h5"
            {...labelProps}
          >
            {label}
          </AppText>
          {optional && (
            <AppText color="black_40" typography="medium_12" {...labelProps}>
              (optional)
            </AppText>
          )}
        </View>
      )}

      <View
        style={[
          styles.inputWrapper,
          props.disabled && styles.disabledInputWrapper,
        ]}
      >
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={
            props.disabled ? COLORS.black_20 : COLORS.black_40
          }
          editable={!props.disabled}
          hitSlop={{ top: 16, bottom: 16, left: 14, right: 14 }}
          textAlignVertical="top"
          multiline={true}
          {...props}
        />
      </View>

      {errorMessage && (
        <AppText
          typography="medium_10"
          color="red"
          {...errorMessageProps}
          style={[styles.errorMessage, styles.errorMessage]}
        >
          {errorMessage}
        </AppText>
      )}
    </View>
  );
};
