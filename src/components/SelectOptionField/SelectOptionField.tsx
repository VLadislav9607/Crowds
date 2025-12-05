import { TouchableOpacity, View } from 'react-native';
import { AppText } from '@ui';
import { SvgXml } from 'react-native-svg';
import { ICONS } from '@assets';
import { COLORS } from '@styles';
import { BottomSheetField } from '../BottomSheetField';
import { styles } from './styles';
import { SelectOptionFieldItem, SelectOptionFieldProps } from './types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RefObject, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export const SelectOptionField = ({
  options = [],
  selectedValues,
  fieldProps,
  containerStyle,
  enableAutoClose = true,
  onOptionSelect,
  onSelectedOptionsChange,
}: SelectOptionFieldProps) => {
  const internalBottomSheetRef = useRef<BottomSheetModal>(null);
  const bottomSheetRef =
    (fieldProps?.bottomSheetRef as RefObject<BottomSheetModal>) ||
    internalBottomSheetRef;

  const insets = useSafeAreaInsets();

  const selectedValuesArray = Array.isArray(selectedValues)
    ? selectedValues
    : selectedValues
    ? [selectedValues]
    : [];

  const handleSelect = (item: SelectOptionFieldItem, index: number) => {
    onOptionSelect?.(item, index);

    if (onSelectedOptionsChange) {
      if (selectedValuesArray.includes(item.value)) {
        const filteredValues = selectedValuesArray.filter(
          v => v !== item.value,
        );
        const filteredOptions = options.filter(o =>
          filteredValues.includes(o.value),
        );
        onSelectedOptionsChange(filteredOptions);
      } else {
        const newValues = [...selectedValuesArray, item.value];
        const newOptions = options.filter(o => newValues.includes(o.value));
        onSelectedOptionsChange(newOptions);
      }
    }

    enableAutoClose && bottomSheetRef.current?.dismiss();
  };

  return (
    <BottomSheetField
      {...fieldProps}
      bottomSheetRef={bottomSheetRef}
      bottomSheetProps={{
        enableDynamicSizing: true,
        ...fieldProps?.bottomSheetProps,
      }}
    >
      <View
        style={[
          styles.container,
          { paddingBottom: insets.bottom || 10 },
          containerStyle,
        ]}
      >
        {fieldProps?.placeholderText && (
          <AppText
            color="black"
            typography="bold_20"
            margin={{ bottom: 16, top: 16 }}
          >
            {fieldProps.placeholderText}
          </AppText>
        )}

        {options.map((item, index) => {
          const isLastItem = index === options.length - 1;
          const isSelected = selectedValuesArray.includes(item.value);
          return (
            <View key={item.value}>
              <TouchableOpacity
                key={item.value}
                style={styles.selectItem}
                onPress={() => handleSelect(item, index)}
              >
                <AppText key={item.value} color="black" typography="regular_14">
                  {item.label}
                </AppText>

                {isSelected && (
                  <SvgXml
                    xml={ICONS.checked('black')}
                    width={14}
                    height={14}
                    color={COLORS.main}
                  />
                )}
              </TouchableOpacity>

              {!isLastItem && <View style={styles.underline} />}
            </View>
          );
        })}
      </View>
    </BottomSheetField>
  );
};
