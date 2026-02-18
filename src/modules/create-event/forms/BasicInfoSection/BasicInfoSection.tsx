import { forwardRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import { AppInput, AppText } from '@ui';
import { CreateEventFormData } from '../../validation';
import { SelectEventCategoryField } from '../../../events/components';
import { CheckboxList, If, PlacesPredictionsInput } from '@components';
import { PlaceAutocompleteType } from '@googlemaps/google-maps-services-js';
import { useGetMe } from '@actions';
import {
  getOfficeCountries,
  findOfficeByCountryCode,
} from '../../helpers/officeLocationHelpers';

export const BasicInfoSection = forwardRef<View>((_props, ref) => {
  const {
    control,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<CreateEventFormData>();

  const { organizationMember } = useGetMe();
  const offices = organizationMember?.current_context?.offices ?? [];
  const officeCountries = getOfficeCountries(offices);
  const isMultiOffice = officeCountries.length > 1;

  const locationType = watch('locationType');
  const locationCountryCode = watch('locationCountryCode');
  const eventType = watch('eventType');
  const isMediaProduction = eventType === 'media_production';
  const isEntireCountry = locationType === 'entire_country';

  useEffect(() => {
    if (isMediaProduction && isEntireCountry) {
      handleLocationTypeChange('specific_location');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMediaProduction]);

  const handleLocationTypeChange = (value: string) => {
    if (value === 'entire_country') {
      setValue('locationType', 'entire_country');
      setValue('location', undefined);
      clearErrors('location');

      if (!isMultiOffice && officeCountries.length === 1) {
        setValue('officeId', officeCountries[0].officeId);
        setValue('locationCountryCode', officeCountries[0].code);
      }
    } else {
      setValue('locationType', 'specific_location');
      setValue('locationCountryCode', undefined);
      clearErrors('locationCountryCode');

      if (isMultiOffice) {
        setValue('officeId', '');
      }
    }
  };

  const handleSelectCountry = (value: string) => {
    const country = officeCountries.find(c => c.code === value);
    if (country) {
      setValue('locationCountryCode', country.code);
      setValue('officeId', country.officeId);
      clearErrors('locationCountryCode');
    }
  };

  return (
    <View ref={ref} collapsable={false} style={styles.container}>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <AppInput
            label="Title of the event"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.title?.message}
            placeholder="Enter event title"
            labelProps={{
              typography: 'h5_mob',
              color: 'black',
              style: styles.label,
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="category"
        render={({ field: { value, onChange } }) => (
          <SelectEventCategoryField
            onChange={val => onChange(val.id)}
            selectedCategoryId={value}
            fieldProps={{
              label: 'Category',
              errorMessage: errors.category?.message,
              placeholderText: 'Select category of event',
              labelProps: {
                typography: 'h5_mob',
                color: 'black',
                style: styles.label,
              },
            }}
          />
        )}
      />

      <View style={styles.locationSection}>
        <If condition={!isMediaProduction}>
          <AppText typography="h5_mob" color="black">
            Location type
          </AppText>
          <AppText
            typography="regular_12"
            color="black"
            margin={{ bottom: 10 }}
          >
            Where will the event take place - either entire country or specific
            location?
          </AppText>
          <CheckboxList
            checkedValues={
              isMediaProduction ? 'specific_location' : locationType
            }
            items={
              isMediaProduction
                ? [{ label: 'Specific location', value: 'specific_location' }]
                : [
                    { label: 'Entire country', value: 'entire_country' },
                    { label: 'Specific location', value: 'specific_location' },
                  ]
            }
            checkboxProps={{ type: 'circle' }}
            onCheckboxPress={item => handleLocationTypeChange(item.value)}
          />
        </If>

        {isEntireCountry && isMultiOffice && (
          <View style={styles.countryList}>
            <AppText typography="h5_mob" color="black" style={styles.label}>
              Select country
            </AppText>
            <CheckboxList
              listContainerStyle={{ flexDirection: 'column' }}
              checkedValues={locationCountryCode}
              items={officeCountries.map(country => ({
                label: country.name,
                value: country.code,
              }))}
              checkboxProps={{ type: 'circle' }}
              onCheckboxPress={item => handleSelectCountry(item.value)}
              errorMessage={errors.locationCountryCode?.message}
            />
          </View>
        )}

        {!isEntireCountry && (
          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, value } }) => (
              <PlacesPredictionsInput
                includeTimezone
                containerStyle={{ marginTop: isMediaProduction ? 0 : 10 }}
                types={PlaceAutocompleteType.address}
                onChangeText={text => {
                  if (!text) {
                    onChange(undefined);
                  }
                }}
                defaultValue={value?.formatted_address || ''}
                onSelectPlace={place => {
                  const parsed = place.parsed_details as any;
                  const timezoneId = place.timezone?.timeZoneId;

                  onChange({
                    autocomplete_description:
                      parsed.autocomplete_description ||
                      place.autocomplete_descripton,
                    city: parsed.city || '',
                    coords: parsed.coords || '',
                    country: parsed.country || '',
                    formatted_address:
                      parsed.formatted_address || place.autocomplete_descripton,
                    latitude: parsed.latitude || 0,
                    longitude: parsed.longitude || 0,
                    place_id:
                      parsed.place_id || place.raw_details.place_id || '',
                    postal_code: parsed.postal_code,
                    region: parsed.region || '',
                    street_name: parsed.street_name,
                    street_number: parsed.street_number,
                    timezone: timezoneId,
                  });

                  const detectedCountryCode = parsed.country_code;
                  if (detectedCountryCode) {
                    setValue('locationCountryCode', detectedCountryCode);
                    const matchedOffice = findOfficeByCountryCode(
                      offices,
                      detectedCountryCode,
                    );
                    if (matchedOffice) {
                      setValue('officeId', matchedOffice.office_id);
                    }
                  }
                }}
                inputProps={{
                  placeholder: 'Enter event location',
                  label: 'Event Location',
                  errorMessage: errors.location?.message,
                  labelProps: {
                    typography: 'h5_mob',
                    color: 'black',
                  },
                }}
              />
            )}
          />
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  label: {
    marginBottom: 5,
  },
  locationSection: {
    gap: 12,
  },
  countryList: {
    gap: 8,
    marginTop: 5,
  },
});
