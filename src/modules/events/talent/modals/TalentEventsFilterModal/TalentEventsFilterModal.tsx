import { BottomSheetView } from "@gorhom/bottom-sheet";
import { AppButton, AppCheckbox, AppInput, AppText } from "@ui";
import { useCallback, useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TalentEventsFilterModalProps, TalentEventsFilterData } from "./types";
import { View } from "react-native";
import { styles } from "./styles";
import { AppBottomSheet, AppDateInput, CheckboxList, RangeSelector } from "@components";
import { COLORS, TYPOGRAPHY } from "@styles";


export const TalentEventsFilterModal = ({ bottomSheetRef, bottomSheetProps, onApply }: TalentEventsFilterModalProps) => {

    const insets = useSafeAreaInsets();

    const snapPoints = useMemo(() => ['90%'], []);

    const [filters, setFilters] = useState<TalentEventsFilterData>({
    })

    const onChangeFiltersData = useCallback((key: keyof TalentEventsFilterData, value: unknown) => {
        setFilters(prevFilters => {
            if (value === undefined) {
                const newFilters = { ...prevFilters }
                delete newFilters[key]
                return newFilters
            } else {
                return { ...prevFilters, [key]: value }
            }
        })
    }, []);


    const handleApplyFilters = () => {
        onApply?.(filters);
        bottomSheetRef?.current?.dismiss();
    }

    return <AppBottomSheet
        bottomSheetRef={bottomSheetRef}
        enableContentPanningGesture={false}
        activeOffsetX={[-10, 10]}
        failOffsetX={[-20, 20]}
        activeOffsetY={[-1, 1]}
        snapPoints={snapPoints}
        {...bottomSheetProps}>
        <BottomSheetView style={styles.bottomSheetContent}>
            <View style={[styles.container, { paddingBottom: insets.bottom + 24 }]}>
                <View style={styles.headerContainer}>
                    <AppText typography="h3" color='black_50'>Filter</AppText>
                    {/* <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} activeOpacity={0.8}>
                        <AppText typography='bold_16' color='gray'>Clear</AppText>
                    </TouchableOpacity> */}
                </View>


                <View style={styles.contentContainer}>
                    <RangeSelector
                        label='Distance'
                        min={1}
                        max={100}
                        defaultMinValue={filters.distance?.min || 1}
                        defaultMaxValue={filters.distance?.max || 100}
                        bottomLabels={{ minValueLabel: '1 Km', maxValueLabel: '100 Km' }}
                        labelProps={{ typography: 'h5' }}
                        onRenderValue={(values) => `${values.min} Km - ${values.max} Km`}
                        onSlidingComplete={(values) => { onChangeFiltersData('distance', { min: values[0], max: values[1] }) }}
                    />

                    <View>
                        <CheckboxList
                            checkedValues={filters.location?.current ? 'current_location' : filters.location?.another ? 'another_location' : undefined}
                            onCheckboxPress={(item) => {
                                onChangeFiltersData('location', {
                                    current: item.value === 'current_location',
                                    another: item.value === 'another_location',
                                });
                            }}
                            items={[
                                { value: 'current_location', label: 'Current Location' },
                                { value: 'another_location', label: 'Another Location' },
                            ]}

                        />

                        {filters.location?.another && <AppInput placeholder='Enter location' containerStyle={styles.locationInputContainer} value={filters.location?.location || ''} onChangeText={(text) => {
                            onChangeFiltersData('location', {
                                ...filters.location,
                                location: text,
                            });
                        }} />}
                    </View>


                    <View>
                        <AppText typography='h5'>Select date</AppText>

                        <View style={styles.dateInputsContainer}>
                            <AppDateInput onChange={(date) => { onChangeFiltersData('date', { ...filters.date, from: date }) }} value={filters.date?.from} placeholder="Date from" defaultIconPosition='right' containerStyle={styles.dateInputFlex} />
                            <AppDateInput onChange={(date) => { onChangeFiltersData('date', { ...filters.date, to: date }) }} value={filters.date?.to} placeholder="Date to" defaultIconPosition='right' containerStyle={styles.dateInputFlex} />
                        </View>
                    </View>


                    <View style={styles.jobTypeContainer}>
                        <AppText typography='h5'>Job Type</AppText>

                        <View style={styles.jobTypeRow}>
                            <View style={styles.checkboxRow}>
                                <AppCheckbox checked={filters.jobType === 'urgent_24_hours'} onChange={() => { onChangeFiltersData('jobType', 'urgent_24_hours') }} />
                                <AppText typography='bold_14' style={styles.checkboxTextFlex} color='dark_gray'>Urgent Jobs <AppText typography='regular_14' color='dark_gray'>(within 24 Hours)</AppText></AppText>
                            </View>

                            <View style={styles.checkboxRow}>
                                <AppCheckbox checked={filters.jobType === 'urgent_3_days'} onChange={() => { onChangeFiltersData('jobType', 'urgent_3_days') }} />
                                <AppText typography='bold_14' style={styles.checkboxTextFlex} color='dark_gray'>Urgent Jobs <AppText typography='regular_14' color='dark_gray'>(within 3 days)</AppText></AppText>
                            </View>
                        </View>


                        <View style={styles.jobTypeRow}>
                            <AppCheckbox checked={filters.jobType === 'hourly'} onChange={() => { onChangeFiltersData('jobType', 'hourly') }} label='Hourly Job' containerStyle={styles.checkboxRow} labelProps={{ typography: 'bold_14', color: 'dark_gray' }} />
                            <AppCheckbox checked={filters.jobType === 'fixed'} onChange={() => { onChangeFiltersData('jobType', 'fixed') }} label='Fixed Rate' containerStyle={styles.checkboxRow} labelProps={{ typography: 'bold_14', color: 'dark_gray' }} />
                        </View>
                    </View>


                    <View style={styles.buttonsContainer}>
                        <AppButton
                            title='Clear filters'
                            onPress={() => setFilters({})}
                            variant="withBorder"
                            wrapperStyles={styles.clearButtonWrapper}
                            titleStyles={{ color: COLORS.main, ...TYPOGRAPHY.semibold_16 }}
                        />
                        <AppButton
                            title='Apply'
                            onPress={handleApplyFilters}
                            wrapperStyles={styles.applyButtonWrapper}
                            titleStyles={{ ...TYPOGRAPHY.semibold_16 }}
                        />
                    </View>
                </View>

            </View>
        </BottomSheetView>
    </AppBottomSheet>

};
