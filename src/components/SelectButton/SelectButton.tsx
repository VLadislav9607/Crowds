import { AppCheckbox, AppText } from '@ui';
import { TouchableOpacity, View } from 'react-native';
import { SelectButtonProps } from './types';
import { styles } from './styles';

export const SelectButton = ({
  title,
  onPress,
  isSelected,
  description,
}: SelectButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
    >
      <AppCheckbox
        color="dark_gray2"
        colorChecked="main"
        disabled
        checked={isSelected}
      />
      <View style={styles.textContainer}>
        <AppText typography="bold_14">{title}</AppText>
        <AppText
          typography="medium_12"
          color="gray_primary"
          margin={{ top: 4 }}
        >
          {description}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};
