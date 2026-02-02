import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { AppBottomSheet, RangeSelector, SelectOptionField } from '@components';
import { AppButton, AppText } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';
import {
  hairColourOptions,
  hairStyleOptions,
  eyeColourOptions,
  facialAttributesOptions,
  tattooSpotOptions,
  skinToneOptions,
  SelectSkinToneField,
  PregnancyField,
} from '@modules/profile';

import { styles, MAX_CONTENT_HEIGHT } from './styles';
import { FilterTalentsModalProps, FiltersState } from './types';

export const FilterTalentsModal = ({
  bottomSheetRef,
  onApplyFilters,
  initialFilters,
}: FilterTalentsModalProps) => {
  const insets = useSafeAreaInsets();
  const [contentHeight, setContentHeight] = useState(0);
  const [filters, setFilters] = useState<FiltersState>({ distance: 100});

  useEffect(() => {
    if (initialFilters && Object.keys(initialFilters).length > 0) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const isScrollable = contentHeight > MAX_CONTENT_HEIGHT;

  const handleClearFilters = () => {
    const clearedFilters = { distance: 100 };
    setFilters(clearedFilters);
    onApplyFilters?.(clearedFilters);
  };

  const handleApplyFilters = () => {
    onApplyFilters?.(filters);
    bottomSheetRef?.current?.dismiss();
  };

  const updateFilter = <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K],
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AppBottomSheet
      bottomSheetRef={bottomSheetRef}
      enableContentPanningGesture={false}
      enableDynamicSizing
      maxDynamicContentSize={MAX_CONTENT_HEIGHT}
    >
      <BottomSheetView>
        <View
          onLayout={e => setContentHeight(e.nativeEvent.layout.height)}
          style={[styles.contentWrapper, { maxHeight: MAX_CONTENT_HEIGHT }]}
        >
          <View style={styles.headerContainer}>
            <AppText typography="extra_bold_26" color="black_50">
              Filter
            </AppText>

            <TouchableOpacity onPress={handleClearFilters}>
              <AppText typography="bold_16" color="gray">
                Clear
              </AppText>
            </TouchableOpacity>
          </View>

          <ScrollView
            bounces={false}
            scrollEnabled={isScrollable}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <RangeSelector
              label="Distance"
              labelProps={{ typography: 'h5' }}
              min={1}
              max={100}
              disableRange
              defaultMinValue={filters.distance}
              defaultMaxValue={100}
              bottomLabels={{ minValueLabel: '1 Km', maxValueLabel: '100 Km' }}
              onRenderValue={values => `${values.min} Km`}
              onSlidingComplete={values =>
                updateFilter('distance', values[0])
              }
            />

            <AppText typography="semibold_18" margin={{ bottom: 16, top: 16 }}>
              By talent profile
            </AppText>

            <RangeSelector
              label="Your Weight"
              min={20}
              max={150}
              defaultMinValue={filters.weight?.min || 20}
              defaultMaxValue={filters.weight?.max || 150}
              onSlidingComplete={values => updateFilter('weight', { min: values[0], max: values[1] })}
              bottomLabels={{
                minValueLabel: '20 Kg',
                maxValueLabel: '150 Kg',
              }}
              measure="Kg"
              onRenderValue={values => `${values.min} - ${values.max} Kg`}
            />

            <RangeSelector
              label="Your Height"
              min={2}
              max={8}
              defaultMinValue={filters.height?.min || 2}
              defaultMaxValue={filters.height?.max || 8}
              step={0.1}
              onSlidingComplete={values => updateFilter('height', { min: values[0], max: values[1] })}
              bottomLabels={{
                minValueLabel: '2 Feet',
                maxValueLabel: '8 Feet',
              }}
              measure="Ft"
              onRenderValue={values => {
                const minFractional = Math.round((values.min % 1) * 10);
                const maxFractional = Math.round((values.max % 1) * 10);
                const minStr = `${Math.floor(values.min)} foot${minFractional ? ` ${minFractional} Inch` : ''}`;
                const maxStr = `${Math.floor(values.max)} foot${maxFractional ? ` ${maxFractional} Inch` : ''}`;
                return `${minStr} - ${maxStr}`;
              }}
            />

            <SelectOptionField
              fieldProps={{
                label: 'Hair Colour',
                placeholderText: 'Pick hair colour',
                value: hairColourOptions.find(
                  o => o.value === filters.hairColour,
                )?.label,
              }}
              options={hairColourOptions}
              selectedValues={filters.hairColour}
              onOptionSelect={item => updateFilter('hairColour', item.value)}
            />

            <SelectOptionField
              fieldProps={{
                label: 'Hair Style',
                placeholderText: 'Pick hair style',
                value: hairStyleOptions.find(o => o.value === filters.hairStyle)
                  ?.label,
              }}
              options={hairStyleOptions}
              selectedValues={filters.hairStyle}
              onOptionSelect={item => updateFilter('hairStyle', item.value)}
            />

            <SelectOptionField
              fieldProps={{
                label: 'Eye Colour',
                placeholderText: 'Pick eye colour',
                value: eyeColourOptions.find(o => o.value === filters.eyeColour)
                  ?.label,
              }}
              options={eyeColourOptions}
              selectedValues={filters.eyeColour}
              onOptionSelect={item => updateFilter('eyeColour', item.value)}
            />

            <SelectOptionField
              fieldProps={{
                label: 'Facial Attributes',
                placeholderText: 'Select facial attributes',
                value: filters.facialAttributes
                  ?.map(
                    o =>
                      facialAttributesOptions.find(f => f.value === o)?.label,
                  )
                  .join(', '),
              }}
              options={facialAttributesOptions}
              enableAutoClose={false}
              selectedValues={filters.facialAttributes}
              onSelectedOptionsChange={items =>
                updateFilter(
                  'facialAttributes',
                  items.map(o => o.value),
                )
              }
            />

            <SelectOptionField
              fieldProps={{
                label: 'Tattoo Spot',
                placeholderText: 'Pick tattoo spots',
                value: filters.tattooSpot
                  ?.map(o => tattooSpotOptions.find(t => t.value === o)?.label)
                  .join(', '),
              }}
              options={tattooSpotOptions}
              enableAutoClose={false}
              selectedValues={filters.tattooSpot}
              onSelectedOptionsChange={items =>
                updateFilter(
                  'tattooSpot',
                  items.map(o => o.value),
                )
              }
            />

            <PregnancyField
              isPregnant={filters.isPregnant}
              setIsPregnant={value => updateFilter('isPregnant', value)}
              months={filters.months}
              setMonths={value => updateFilter('months', value)}
            />

            <SelectSkinToneField
              fieldProps={{
                value: skinToneOptions.find(o => o.value === filters.skinTone)
                  ?.label,
              }}
              selectedValues={filters.skinTone}
              onOptionSelect={item => updateFilter('skinTone', item.value)}
            />

            <View
              style={[
                styles.buttonsContainer,
                { paddingBottom: insets.bottom + 24 },
              ]}
            >
              <AppButton
                title="Clear filters"
                onPress={handleClearFilters}
                variant="withBorder"
                wrapperStyles={styles.clearButtonWrapper}
                titleStyles={{ color: COLORS.main, ...TYPOGRAPHY.semibold_16 }}
              />
              <AppButton
                title="Apply"
                onPress={handleApplyFilters}
                wrapperStyles={styles.applyButtonWrapper}
                titleStyles={{ ...TYPOGRAPHY.semibold_16 }}
              />
            </View>
          </ScrollView>
        </View>
      </BottomSheetView>
    </AppBottomSheet>
  );
};
