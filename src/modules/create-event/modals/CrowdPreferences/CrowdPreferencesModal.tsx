import { useState, useEffect, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { AppBottomSheet, RangeSelector } from '@components';
import { AppButton, AppText } from '@ui';
import { PregnancyField } from '@modules/profile';
import { useKeyboard } from '@hooks';

import { CrowdPreferences } from '../../validation';
import { CheckboxGroup, AdditionalThingsInput } from '../../components';
import { CrowdPreferencesModalProps } from './types';
import { CHECKBOX_CONFIGS } from './constants';
import { styles } from './styles';

export const CrowdPreferencesModal = ({
  bottomSheetRef,
  preferences,
  onSave,
}: CrowdPreferencesModalProps) => {
  const [localPreferences, setLocalPreferences] = useState<CrowdPreferences>(
    preferences || {},
  );
  const { keyboardHeight, isKeyboardVisible } = useKeyboard();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setLocalPreferences(preferences || {});
  }, [preferences]);

  useEffect(() => {
    if (isKeyboardVisible) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [isKeyboardVisible]);

  const handleCheckboxChange = (
    key: keyof CrowdPreferences,
    values: string[],
  ) => {
    setLocalPreferences(prev => ({
      ...prev,
      [key]: values.length > 0 ? values : undefined,
    }));
  };

  const handleChangeWeight = (min: number, max: number) => {
    setLocalPreferences(prev => ({
      ...prev,
      minWeight: min,
      maxWeight: max,
    }));
  };

  const handleChangeHeight = (min: number, max: number) => {
    setLocalPreferences(prev => ({
      ...prev,
      minHeight: min,
      maxHeight: max,
    }));
  };

  const handleSave = () => {
    const isMonthsPresent = Boolean(localPreferences.months);
    const filledAdditionalThings =
      localPreferences?.additionalThings?.filter(thing => Boolean(thing)) || [];

    onSave({
      ...localPreferences,
      months: isMonthsPresent ? Number(localPreferences.months) : undefined,
      isPregnant: isMonthsPresent
        ? true
        : localPreferences.isPregnant === true
        ? undefined
        : localPreferences.isPregnant,
      additionalThings:
        filledAdditionalThings.length > 0 ? filledAdditionalThings : undefined,
    });
    bottomSheetRef.current?.dismiss();
  };

  const handleClear = () => {
    setLocalPreferences({});
    onSave({});
    bottomSheetRef.current?.dismiss();
  };

  return (
    <AppBottomSheet
      bottomSheetRef={bottomSheetRef}
      snapPoints={['90%']}
      enableDynamicSizing={false}
      enableContentPanningGesture={false}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
    >
      <View style={styles.container}>
        <AppText typography="medium_16" color="black" style={styles.title}>
          Select Your Preferences
        </AppText>

        <BottomSheetScrollView
          ref={scrollViewRef}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: keyboardHeight || 16 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <AppText typography="regular_14" color="black">
            <AppText typography="bold_14" color="red">
              Fill in preferences carefully
            </AppText>
            : only talents matching the selected criteria will be able to apply.
            If you don’t want to set restrictions, leave preferences empty.
          </AppText>

          {CHECKBOX_CONFIGS.map(config => (
            <CheckboxGroup
              key={config.key}
              label={config.label}
              options={config.options}
              selectedValues={(localPreferences[config.key] as string[]) || []}
              onChange={values => handleCheckboxChange(config.key, values)}
            />
          ))}

          <RangeSelector
            label="Weight"
            min={20}
            max={150}
            defaultMinValue={localPreferences.minWeight || 20}
            defaultMaxValue={localPreferences.maxWeight || 150}
            containerStyles={styles.rangeBackground}
            measure="Kg"
            onRenderValue={values => `${values.min} - ${values.max} Kg`}
            onSlidingComplete={values => {
              handleChangeWeight(values[0], values[1]);
            }}
            bottomLabels={{ minValueLabel: '20 Kg', maxValueLabel: '150 Kg' }}
          />

          <RangeSelector
            label="Height"
            measure="Ft"
            min={2}
            max={8}
            defaultMinValue={localPreferences.minHeight || 2}
            defaultMaxValue={localPreferences.maxHeight || 8}
            step={0.1}
            containerStyles={styles.rangeBackground}
            onSlidingComplete={values =>
              handleChangeHeight(values[0], values[1])
            }
            bottomLabels={{ minValueLabel: '2 Feet', maxValueLabel: '8 Feet' }}
            onRenderValue={values => {
              const minFractionalPart = Math.round((values.min % 1) * 10);
              const maxFractionalPart = Math.round((values.max % 1) * 10);

              return `${Math.floor(values.min)} foot${
                minFractionalPart ? ` ${minFractionalPart} Inch` : ''
              } - ${Math.floor(values.max)} foot ${
                maxFractionalPart ? `${maxFractionalPart} Inch` : ''
              }`;
            }}
          />

          <PregnancyField
            isPregnant={localPreferences.isPregnant}
            setIsPregnant={value => {
              const newValue =
                value === localPreferences.isPregnant ? undefined : value;
              setLocalPreferences({
                ...localPreferences,
                isPregnant: newValue,
                months: newValue ? localPreferences.months : undefined,
              });
            }}
            months={localPreferences.months?.toString()}
            setMonths={value =>
              setLocalPreferences({
                ...localPreferences,
                months: value ? Number(value) : undefined,
              })
            }
          />

          <AdditionalThingsInput
            items={localPreferences.additionalThings || []}
            onItemsChange={items =>
              setLocalPreferences(prev => ({
                ...prev,
                additionalThings: items,
              }))
            }
          />

          <View style={styles.footer}>
            <AppButton
              title="Clear"
              variant="withBorder"
              size="50"
              onPress={handleClear}
              wrapperStyles={styles.footerButton}
            />
            <AppButton
              title="Apply"
              variant="primary"
              size="50"
              onPress={handleSave}
              wrapperStyles={styles.footerButton}
            />
          </View>
        </BottomSheetScrollView>
      </View>
    </AppBottomSheet>
  );
};
