import { ScrollView, TouchableOpacity, View } from 'react-native';
import { AppText } from '@ui';
import { SvgXml } from 'react-native-svg';
import { ICONS } from '@assets';
import { COLORS } from '@styles';
import { styles } from './styles';
import { BottomSheetField } from '@components';
import { SelectSkinToneFieldItem, SelectSkinToneFieldProps } from './types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RefObject, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { skinToneOptions } from '../../../constants';

export const SelectSkinToneField = ({
  selectedValues,
  fieldProps,
  containerStyle,
  enableAutoClose = true,
  onOptionSelect,
  onSelectedOptionsChange,
}: SelectSkinToneFieldProps) => {
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

  const handleSelect = (item: SelectSkinToneFieldItem, index: number) => {
    onOptionSelect?.(item, index);

    if (onSelectedOptionsChange) {
      if (selectedValuesArray.includes(item.value)) {
        const filteredValues = selectedValuesArray.filter(
          v => v !== item.value,
        );
        const filteredOptions = skinToneOptions.filter(o =>
          filteredValues.includes(o.value),
        );
        onSelectedOptionsChange(filteredOptions);
      } else {
        const newValues = [...selectedValuesArray, item.value];
        const newOptions = skinToneOptions.filter(o =>
          newValues.includes(o.value),
        );
        onSelectedOptionsChange(newOptions);
      }
    }

    enableAutoClose && bottomSheetRef.current?.dismiss();
  };

  const selectedOption = skinToneOptions.find(o =>
    selectedValuesArray.includes(o.value),
  );

  return (
    <BottomSheetField
      label="Skin Tone"
      placeholderText="Select skin tone"
      leftIcon={
        <View
          style={[
            styles.skinToneIcon,
            { backgroundColor: selectedOption?.hex },
          ]}
        />
      }
      labelProps={{ color: 'main' }}
      {...fieldProps}
      bottomSheetRef={bottomSheetRef}
      bottomSheetProps={{
        enableDynamicSizing: true,
        ...fieldProps?.bottomSheetProps,
      }}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContentContainer,
          { paddingBottom: insets.bottom || 10 },
        ]}
      >
        <View style={[styles.container, containerStyle]}>
          <AppText
            color="black"
            typography="bold_20"
            margin={{ bottom: 16, top: 16 }}
          >
            {fieldProps?.placeholderText ?? 'Select skin tone'}
          </AppText>

          {skinToneOptions.map((item, index) => {
            const isLastItem = index === skinToneOptions.length - 1;
            const isSelected = selectedValuesArray.includes(item.value);
            return (
              <View key={item.value}>
                <TouchableOpacity
                  key={item.value}
                  style={styles.selectItem}
                  onPress={() => handleSelect(item, index)}
                >
                  <View style={styles.skinToneItem}>
                    <View
                      style={[
                        styles.skinToneItemColor,
                        { backgroundColor: item.hex },
                      ]}
                    ></View>
                    <AppText
                      key={item.value}
                      color="black"
                      typography="regular_14"
                    >
                      {item.label}
                    </AppText>
                  </View>

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
      </ScrollView>
    </BottomSheetField>
  );
};
