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

  const handleRangeChange = (key: 'weight' | 'height', value: number) => {
    setLocalPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    onSave(localPreferences);
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
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
    >
      <View style={styles.container}>
        <AppText typography="h3_mob" color="black" style={styles.title}>
          Crowd Preferences
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
            disableRange
            min={20}
            max={150}
            defaultMinValue={localPreferences.weight || 20}
            defaultMaxValue={150}
            containerStyles={styles.rangeBackground}
            measure="Kg"
            onRenderValue={values => `${values.min} Kg`}
            onSlidingComplete={values => handleRangeChange('weight', values[0])}
            bottomLabels={{ minValueLabel: '20 Kg', maxValueLabel: '150 Kg' }}
          />

          <RangeSelector
            label="Height"
            measure="Ft"
            disableRange
            min={2}
            max={8}
            defaultMinValue={localPreferences.height || 2}
            defaultMaxValue={8}
            step={0.1}
            containerStyles={styles.rangeBackground}
            onSlidingComplete={values => handleRangeChange('height', values[0])}
            bottomLabels={{ minValueLabel: '2 Feet', maxValueLabel: '8 Feet' }}
            onRenderValue={values => {
              const fractionalPart = Math.round((values.min % 1) * 10);
              return `${Math.floor(values.min)} foot ${
                fractionalPart ? `${fractionalPart} Inch` : ''
              }`;
            }}
          />

          <PregnancyField
            isPregnant={localPreferences.isPregnant}
            setIsPregnant={value =>
              setLocalPreferences(prev => ({ ...prev, isPregnant: value }))
            }
            months={localPreferences.months}
            setMonths={value =>
              setLocalPreferences(prev => ({ ...prev, months: value }))
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
