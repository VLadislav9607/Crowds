import { TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '@styles';
import { AppText } from '../AppText';
import { AppInputProps } from './types';
import { styles } from './styles';
import { ICONS } from '@assets';
import { SvgXml } from 'react-native-svg';
import { useState } from 'react';

export const AppInput = ({
  label,
  errorMessage,
  style,
  labelProps,
  containerStyle,
  errorMessageProps,
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
          style={[styles.label, styles.label]}
        >
          {label}
        </AppText>
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
          {...props}
          secureTextEntry={isHidden}
        />

        {props.secureTextEntry && (
          <TouchableOpacity hitSlop={10} onPress={() => setIsHidden(!isHidden)}>
            <SvgXml
              xml={isHidden ? ICONS.eyeIcon() : ICONS.eyeClosedIcon()}
              width={24}
              height={24}
            />
          </TouchableOpacity>
        )}
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
