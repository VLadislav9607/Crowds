import { AppCheckbox, AppText } from '@ui';
import { View } from 'react-native';
import { CheckboxListItem, CheckboxListProps } from './types';
import { styles } from './styles';
import { If } from '../If';

export const CheckboxList = ({
  items,
  label,
  errorMessage,
  errorMessageProps,
  checkedValues,
  containerStyle,
  listContainerStyle,
  checkboxProps,
  onCheckedValuesChange,
  onCheckboxPress,
}: CheckboxListProps) => {
  const checkedValuesArray = Array.isArray(checkedValues)
    ? checkedValues
    : checkedValues
    ? [checkedValues]
    : [];

  const handleCheckboxPress = (item: CheckboxListItem) => {
    onCheckboxPress?.(item);

    if (onCheckedValuesChange) {
      if (checkedValuesArray.includes(item.value)) {
        onCheckedValuesChange(checkedValuesArray.filter(v => v !== item.value));
      } else {
        onCheckedValuesChange([...checkedValuesArray, item.value]);
      }
    }
  };

  return (
    <View style={containerStyle}>
      <If condition={!!label}>
        <AppText color="black_50" typography="medium_14" style={styles.label}>
          {label}
        </AppText>
      </If>

      <View style={[styles.listContainer, listContainerStyle]}>
        {items.map(item => (
          <AppCheckbox
            key={item.value}
            checked={checkedValuesArray?.includes(item.value)}
            onChange={() => handleCheckboxPress(item)}
            label={item.label}
            {...checkboxProps}
            containerStyle={[
              styles.checkboxContainer,
              checkboxProps?.containerStyle,
            ]}
          />
        ))}
      </View>

      <If condition={!!errorMessage}>
        <AppText
          typography="medium_10"
          color="red"
          {...errorMessageProps}
          style={[styles.errorMessage]}
        >
          {errorMessage}
        </AppText>
      </If>
    </View>
  );
};
