import { TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '@styles';
import { AppText } from '../AppText';
import { AppInputProps } from './types';
import { styles } from './styles';
import { ICONS } from '@assets';
import { SvgXml } from 'react-native-svg';
import { useState } from 'react';
import { If, Skeleton } from '@components';

export const AppInput = ({
  label,
  description,
  errorMessage,
  style,
  labelProps,
  containerStyle,
  errorMessageProps,
  inputContainerStyle,
  skeleton = false,
  ...props
}: AppInputProps) => {
  const [isHidden, setIsHidden] = useState(props.secureTextEntry);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <AppText
          color={props.disabled ? 'black_40' : 'black_50'}
          typography="medium_14"
          {...labelProps}
          style={[styles.label, styles.label, labelProps?.style]}
        >
          {label}
        </AppText>
      )}

      <If condition={skeleton}>
        <Skeleton>
          <Skeleton.Item
            width="100%"
            borderRadius={4}
            height={inputContainerStyle?.height || 37}
            marginTop={1}
          />
        </Skeleton>
      </If>

      <If condition={!skeleton}>
        <View
          style={[
            styles.inputWrapper,
            props.disabled && styles.disabledInputWrapper,
            inputContainerStyle,
          ]}
        >
          <TextInput
            style={[styles.input, style]}
            placeholderTextColor={
              props.disabled ? COLORS.black_20 : COLORS.black_40
            }
            editable={!props.disabled}
            {...props}
            secureTextEntry={isHidden}
          />

          {props.secureTextEntry && (
            <TouchableOpacity
              hitSlop={10}
              onPress={() => setIsHidden(!isHidden)}
            >
              <SvgXml
                xml={isHidden ? ICONS.eyeIcon() : ICONS.eyeClosedIcon()}
                width={24}
                height={24}
              />
            </TouchableOpacity>
          )}
        </View>
      </If>

      <AppText
        renderIf={!!description && !errorMessage}
        typography="medium_12"
        color="gray_primary"
        margin={{ top: 10 }}
      >
        {description}
      </AppText>

      <AppText
        renderIf={!!errorMessage}
        typography="medium_10"
        color="red"
        {...errorMessageProps}
        style={[styles.errorMessage, styles.errorMessage]}
      >
        {errorMessage}
      </AppText>
    </View>
  );
};
