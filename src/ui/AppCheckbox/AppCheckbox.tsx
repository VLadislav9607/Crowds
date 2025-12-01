import { TouchableOpacity, View } from 'react-native';
import { AppCheckboxProps } from './types';
import { styles } from './styles';

export const AppCheckbox = ({
  checked,
  type = 'circle',
  onChange,
  checkedStyle,
  ...props
}: AppCheckboxProps) => {
  const hitSlop = type === 'circle' ? 14 : 12;

  return (
    <TouchableOpacity
      hitSlop={{ top: hitSlop, bottom: hitSlop, left: hitSlop, right: hitSlop }}
      onPress={() => onChange?.(!checked)}
      {...props}
      style={[styles[type], props.style]}
    >
      {checked && type === 'circle' && (
        <View style={[styles.circleChecked, checkedStyle]} />
      )}
      {checked && type === 'square' && (
        <View style={[styles.squareChecked, checkedStyle]} />
      )}
    </TouchableOpacity>
  );
};
