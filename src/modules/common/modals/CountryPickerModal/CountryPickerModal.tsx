import { CountryPickerModalProps } from './types';
import { styles } from './styles';
import { TouchableOpacity, View } from 'react-native';
import { AppBottomSheet, If } from '@components';
import { AppButton, AppSearchInputSecondary, AppText } from '@ui';
import { countriesWithFlag, ICountryWithFlag } from '@constants';
import { SvgXml } from 'react-native-svg';
import { ICONS } from '@assets';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBottomSheetData } from '@hooks';
import { CountryPickerModalData } from './types';

export const CountryPickerModal = ({
  bottomSheetRef,
}: CountryPickerModalProps) => {
  const insets = useSafeAreaInsets();

  const [search, setSearch] = useState('');

  const filteredCountries = useMemo(() => {
    return countriesWithFlag.filter(country =>
      country.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const { data, setData, modalRef } =
    useBottomSheetData<CountryPickerModalData>(bottomSheetRef);

  const showDoneButton = !!data?.multiple;

  const [selectedCountriesCodes, setSelectedCountriesCodes] = useState<
    string[]
  >([]);

  useEffect(() => {
    setSelectedCountriesCodes(data?.selectedCodesDefault ?? []);
  }, [data?.selectedCodesDefault]);

  const onCountryPress = (country: ICountryWithFlag) => {
    if (data?.multiple) {
      const index = selectedCountriesCodes.indexOf(country.code);
      if (index === -1) {
        setSelectedCountriesCodes([...selectedCountriesCodes, country.code]);
      } else {
        setSelectedCountriesCodes(
          selectedCountriesCodes.filter(code => code !== country.code),
        );
      }
    } else {
      data?.onCountryPicked?.(country);
      modalRef.current?.dismiss();
    }
  };

  const onDonePress = () => {
    data?.onCountriesPicked?.(
      selectedCountriesCodes.map(
        code => countriesWithFlag.find(country => country.code === code)!,
      ),
    );
    modalRef.current?.dismiss();
  };

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === -1) {
        setData(null);
        setSearch('');
        setSelectedCountriesCodes([]);
      }
    },
    [setData],
  );

  return (
    <AppBottomSheet
      bottomSheetRef={modalRef}
      snapPoints={['90%']}
      enableDynamicSizing={false}
      enableContentPanningGesture={false}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      onChange={handleSheetChange}
    >
      <View style={styles.bottomSheetContent}>
        <AppText typography="semibold_16" margin={{ bottom: 16, top: 8 }}>
          {data?.title || 'Select country'}
        </AppText>

        <AppSearchInputSecondary
          placeholder="Search countries...."
          value={search}
          onChangeText={setSearch}
        />

        <If condition={!!data?.multiple}>
          <View style={styles.headerRow}>
            <AppText typography="regular_14">
              {selectedCountriesCodes.length} selected
            </AppText>

            <If condition={!!selectedCountriesCodes.length}>
              <TouchableOpacity
                onPress={() => setSelectedCountriesCodes([])}
                activeOpacity={0.5}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <AppText typography="bold_14" color="main">
                  Clear all
                </AppText>
              </TouchableOpacity>
            </If>
          </View>
        </If>

        <FlashList
          data={filteredCountries}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.code + item.name + item.dial_code}
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollViewContent,
            {
              paddingBottom: (insets.bottom || 24) + (showDoneButton ? 70 : 0),
            },
          ]}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => {
            const isSelected =
              selectedCountriesCodes.includes(item.code) ||
              !!data?.selectedCodesForever?.includes(item.code);
            const selectedCountryElement = data?.selectedCountryMarkers?.find(
              marker => marker.code === item.code,
            )?.marker;
            const isDisabled = data?.disabledCodes?.includes(item.code);
            return (
              <TouchableOpacity
                disabled={isDisabled}
                onPress={() => onCountryPress(item)}
                activeOpacity={0.5}
                style={[
                  styles.countryItem,
                  isSelected && styles.countryItemSelected,
                  isDisabled && styles.disabledCountryItem,
                ]}
              >
                <View style={styles.countryInfoRow}>
                  <AppText style={styles.flagText}>{item.flag}</AppText>
                  <AppText typography="regular_14" style={{ flex: 1 }}>
                    {item.name}
                  </AppText>
                </View>
                <If condition={isSelected}>
                  {selectedCountryElement || data?.selectedMarkerElement || (
                    <SvgXml
                      xml={ICONS.checked('main')}
                      width={14}
                      height={14}
                    />
                  )}
                </If>
              </TouchableOpacity>
            );
          }}
        />

        <If condition={showDoneButton}>
          <AppButton
            size="56"
            title="Done"
            onPress={onDonePress}
            wrapperStyles={[styles.doneButton, { bottom: insets.bottom || 24 }]}
          />
        </If>
      </View>
    </AppBottomSheet>
  );
};
