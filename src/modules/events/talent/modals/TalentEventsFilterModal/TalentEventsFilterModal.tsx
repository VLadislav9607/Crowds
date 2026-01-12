import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { AppButton, AppCheckbox, AppText } from '@ui';
import { useCallback, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TalentEventsFilterModalProps, TalentEventsFilterData } from './types';
import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import {
  AppBottomSheet,
  AppDateInput,
  CheckboxList,
  If,
  PlacesPredictionsInput,
  RangeSelector,
  Switch,
} from '@components';
import { COLORS, TYPOGRAPHY } from '@styles';
import { useBoolean } from '@hooks';

export const TalentEventsFilterModal = ({
  bottomSheetRef,
  bottomSheetProps,
  onApply,
}: TalentEventsFilterModalProps) => {
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => ['90%'], []);

  const {
    value: filterByDistance,
    toggle: toggleFilterByDistanceState,
    setValue: setFilterByDistance,
  } = useBoolean(false);
  const { value: sortByLocationState, setValue: setSortByLocationState } =
    useBoolean(false);

  const [filters, setFilters] = useState<TalentEventsFilterData>({});

  const onChangeFiltersData = useCallback(
    (key: keyof TalentEventsFilterData, value: unknown) => {
      setFilters(prevFilters => {
        if (value === undefined) {
          const newFilters = { ...prevFilters };
          delete newFilters[key];
          return newFilters;
        } else {
          return { ...prevFilters, [key]: value };
        }
      });
    },
    [],
  );

  const toggleFilterByDistance = () => {
    onChangeFiltersData('distance', !filterByDistance ? 100 : undefined);
    toggleFilterByDistanceState();
  };

  const onPaymentTypeChange = (
    paymentType: TalentEventsFilterData['paymentType'],
  ) => {
    onChangeFiltersData(
      'paymentType',
      paymentType === filters.paymentType ? undefined : paymentType,
    );
  };

  const handleApplyFilters = useCallback(() => {
    const newFilters = { ...filters };
    if (!sortByLocationState) delete newFilters.sortByLocation;
    if (!filterByDistance) delete newFilters.distance;
    onApply?.(newFilters);
    bottomSheetRef?.current?.dismiss();
  }, [filters, onApply, bottomSheetRef, sortByLocationState, filterByDistance]);

  const onClearFilters = () => {
    setSortByLocationState(false);
    setFilterByDistance(false);
    setFilters({});
  };

  const onUrgentChange = useCallback(
    (jobType: 'urgent_24_hours' | 'urgent_3_days') => {
      onChangeFiltersData(
        'jobType',
        jobType === filters.jobType ? undefined : jobType,
      );
    },
    [filters.jobType, onChangeFiltersData],
  );

  return (
    <AppBottomSheet
      enableDynamicSizing={false}
      bottomSheetRef={bottomSheetRef}
      enableContentPanningGesture={false}
      activeOffsetX={[-10, 10]}
      failOffsetX={[-20, 20]}
      activeOffsetY={[-1, 1]}
      snapPoints={snapPoints}
      {...bottomSheetProps}
    >
      <BottomSheetScrollView
        keyboardShouldPersistTaps="handled"
        alwaysBounceVertical={false}
        style={styles.bottomSheetContent}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom + 24,
        }}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <AppText typography="h3" color="black_50">
              Filter
            </AppText>
          </View>

          <View style={styles.contentContainer}>
            <View>
              <AppText typography="h5" margin={{ bottom: 14 }}>
                Search near by
              </AppText>
              <CheckboxList
                checkedValues={
                  sortByLocationState ? 'another_location' : 'current_location'
                }
                onCheckboxPress={item => {
                  setSortByLocationState(item.value === 'another_location');
                }}
                items={[
                  { value: 'current_location', label: 'Profile Location' },
                  { value: 'another_location', label: 'Another Location' },
                ]}
              />

              <If condition={sortByLocationState}>
                <PlacesPredictionsInput
                  containerStyle={styles.locationInputContainer}
                  defaultValue={
                    filters.sortByLocation?.autocomplete_description || ''
                  }
                  onSelectPlace={place => {
                    onChangeFiltersData('sortByLocation', {
                      autocomplete_description: place.autocomplete_descripton,
                      latitude: place.raw_details.geometry?.location.lat || 0,
                      longitude: place.raw_details.geometry?.location.lng || 0,
                    });
                  }}
                />
              </If>
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <AppText typography="h5">Filter by distance</AppText>
                <Switch
                  active={filterByDistance}
                  activeColor="main"
                  onChange={toggleFilterByDistance}
                />
              </View>
              <If condition={filterByDistance}>
                <RangeSelector
                  disabled={!filterByDistance}
                  min={1}
                  max={100}
                  disableRange
                  defaultMinValue={filters.distance || 100}
                  defaultMaxValue={100}
                  bottomLabels={{
                    minValueLabel: '1 Km',
                    maxValueLabel: '100 Km',
                  }}
                  labelProps={{ typography: 'h5' }}
                  onRenderValue={values => `${values.min} Km`}
                  onSlidingComplete={values => {
                    onChangeFiltersData('distance', values[0]);
                  }}
                />
              </If>
            </View>

            <View style={styles.jobTypeContainer}>
              <AppText typography="h5">Urgent Jobs</AppText>

              <View style={styles.jobTypeRow}>
                <View style={styles.checkboxRow}>
                  <AppCheckbox
                    checked={filters.jobType === 'urgent_24_hours'}
                    onChange={() => onUrgentChange('urgent_24_hours')}
                  />
                  <AppText
                    typography="bold_14"
                    style={styles.checkboxTextFlex}
                    color="dark_gray"
                  >
                    Urgent Jobs{' '}
                    <AppText typography="regular_14" color="dark_gray">
                      (within 24 Hours)
                    </AppText>
                  </AppText>
                </View>

                <View style={styles.checkboxRow}>
                  <AppCheckbox
                    checked={filters.jobType === 'urgent_3_days'}
                    onChange={() => onUrgentChange('urgent_3_days')}
                  />
                  <AppText
                    typography="bold_14"
                    style={styles.checkboxTextFlex}
                    color="dark_gray"
                  >
                    Urgent Jobs{' '}
                    <AppText typography="regular_14" color="dark_gray">
                      (within 3 days)
                    </AppText>
                  </AppText>
                </View>
              </View>
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <AppText typography="h5">Select date</AppText>

                <If condition={!!filters.date}>
                  <TouchableOpacity
                    onPress={() => {
                      onChangeFiltersData('date', undefined);
                    }}
                  >
                    <AppText>Clear</AppText>
                  </TouchableOpacity>
                </If>
              </View>

              <View style={styles.dateInputsContainer}>
                <AppDateInput
                  disabled={!!filters.jobType}
                  minimumDate={new Date()}
                  maximumDate={filters.date?.to}
                  onChange={date => {
                    onChangeFiltersData('date', {
                      ...filters.date,
                      from: date,
                    });
                  }}
                  value={filters.date?.from}
                  placeholder="Date from"
                  defaultIconPosition="right"
                  containerStyle={styles.dateInputFlex}
                />
                <AppDateInput
                  disabled={!!filters.jobType}
                  minimumDate={filters.date?.from || new Date()}
                  onChange={date => {
                    onChangeFiltersData('date', { ...filters.date, to: date });
                  }}
                  value={filters.date?.to}
                  placeholder="Date to"
                  defaultIconPosition="right"
                  containerStyle={styles.dateInputFlex}
                />
              </View>
            </View>

            <View style={styles.jobTypeContainer}>
              <AppText typography="h5">Payment Type</AppText>
              <View style={styles.jobTypeRow}>
                <AppCheckbox
                  checked={filters.paymentType === 'hourly'}
                  onChange={() => onPaymentTypeChange('hourly')}
                  label="Hourly Job"
                  containerStyle={styles.checkboxRow}
                  labelProps={{ typography: 'bold_14', color: 'dark_gray' }}
                />
                <AppCheckbox
                  checked={filters.paymentType === 'fixed'}
                  onChange={() => onPaymentTypeChange('fixed')}
                  label="Fixed Rate"
                  containerStyle={styles.checkboxRow}
                  labelProps={{ typography: 'bold_14', color: 'dark_gray' }}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <AppButton
            title="Clear filters"
            onPress={onClearFilters}
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
      </BottomSheetScrollView>
    </AppBottomSheet>
  );
};
