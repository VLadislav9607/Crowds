import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity, View } from 'react-native';
import { AppBottomSheet, RangeSelector } from '@components';
import { AppButton, AppText } from '@ui';
import { TYPOGRAPHY } from '@styles';

import { styles, MAX_CONTENT_HEIGHT } from './styles';
import {
  FilterMatchingTalentsModalProps,
  FilterMatchingTalentsState,
} from './types';

export const FilterMatchingTalentsModal = ({
  bottomSheetRef,
  onApplyFilters,
  initialFilters,
}: FilterMatchingTalentsModalProps) => {
  const { bottom } = useSafeAreaInsets();
  const [filters, setFilters] = useState<FilterMatchingTalentsState>({
    distance: 100,
  });

  useEffect(() => {
    if (initialFilters && Object.keys(initialFilters).length > 0) {
      setFilters(initialFilters);
    }
  }, [initialFilters]);

  const handleClearFilters = () => {
    const clearedFilters = { distance: 100 };
    setFilters(clearedFilters);
    onApplyFilters?.(clearedFilters);
  };

  const handleApplyFilters = () => {
    onApplyFilters?.(filters);
    bottomSheetRef?.current?.dismiss();
  };

  const updateFilter = <K extends keyof FilterMatchingTalentsState>(
    key: K,
    value: FilterMatchingTalentsState[K],
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
        <View style={styles.contentWrapper}>
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
            onSlidingComplete={values => updateFilter('distance', values[0])}
          />

          <AppButton
            title="Apply"
            onPress={handleApplyFilters}
            wrapperStyles={[
              styles.applyButtonWrapper,
              { marginBottom: bottom || 16 },
            ]}
            titleStyles={{ ...TYPOGRAPHY.semibold_16 }}
          />
        </View>
      </BottomSheetView>
    </AppBottomSheet>
  );
};
