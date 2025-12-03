import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { AppCheckboxProps } from './types';
import { styles } from './styles';
import { AppText } from '../AppText';
import { If } from '@components';
import { SvgXml } from 'react-native-svg';
import { ICONS } from '@assets';
import { COLORS } from '@styles';

export const AppCheckbox = ({
  checked,
  type = 'circle',
  label,
  checkedStyle,
  labelProps,
  containerStyle,
  color,
  colorChecked,
  onChange,
  ...props
}: AppCheckboxProps) => {
  const hitSlop = type === 'circle' ? 14 : 12;

  const actualColor = colorChecked && checked ? colorChecked : color;

  const buttonStyles: StyleProp<ViewStyle> = [
    styles[type],
    actualColor && { borderColor: COLORS[actualColor] },
    props.style,
  ];

  const checkedContentStyles: StyleProp<ViewStyle> = [
    actualColor && { backgroundColor: COLORS[actualColor] },
    checkedStyle,
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        hitSlop={{
          top: hitSlop,
          bottom: hitSlop,
          left: hitSlop,
          right: hitSlop,
        }}
        onPress={() => onChange?.(!checked)}
        {...props}
        style={buttonStyles}
      >
        {checked && type === 'circle' && (
          <View style={[styles.circleChecked, ...checkedContentStyles]} />
        )}
        {checked && type === 'square' && (
          <View style={[styles.squareChecked, ...checkedContentStyles]} />
        )}
        {checked && type === 'checkedIcon' && (
          <SvgXml
            xml={ICONS.checked(actualColor || 'dark_blue')}
            width={14}
            height={14}
          />
        )}
      </TouchableOpacity>

      <If condition={!!label}>
        <AppText
          color="black"
          typography="regular_14"
          {...labelProps}
          style={[styles.label, labelProps?.style]}
        >
          {label}
        </AppText>
      </If>
    </View>
  );
};
