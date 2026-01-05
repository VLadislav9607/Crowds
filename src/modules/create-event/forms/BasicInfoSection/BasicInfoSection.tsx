import { forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import { AppInput } from '@ui';
import { CreateEventFormData } from '../../validation';
import { SelectEventCategoryField } from '../../../events/components';
import { PlacesPredictionsInput } from '@components';
import { PlaceAutocompleteType } from '@googlemaps/google-maps-services-js';

export const BasicInfoSection = forwardRef<View>((_props, ref) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateEventFormData>();

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

      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, value } }) => (
          <PlacesPredictionsInput
            includeTimezone
            containerStyle={{ marginBottom: 5 }}
            types={PlaceAutocompleteType.address}
            onChangeText={text => {
              // Clear location when text is cleared
              if (!text) {
                onChange(undefined);
              }
            }}
            defaultValue={value?.formatted_address || ''}
            onSelectPlace={place => {
              console.log('place', place);
              // parseGooglePlaceDetails returns an object with all location fields
              // The parsed_details contains: place_id, autocomplete_description, formatted_address,
              // latitude, longitude, coords, and all parsed additional fields
              const parsed = place.parsed_details as any;
              // Extract timezone ID from Google Maps API response
              const timezoneId = place.timezone?.timeZoneId;
              // Store the parsed location details
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
                place_id: parsed.place_id || place.raw_details.place_id || '',
                postal_code: parsed.postal_code,
                region: parsed.region || '',
                street_name: parsed.street_name,
                street_number: parsed.street_number,
                timezone: timezoneId,
              });
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
});
