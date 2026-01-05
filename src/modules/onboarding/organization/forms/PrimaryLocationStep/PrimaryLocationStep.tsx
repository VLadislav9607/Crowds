import { StyleSheet, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect, useImperativeHandle } from 'react';

import { AppText } from '@ui';
import { TYPOGRAPHY } from '@styles';
import { CheckboxList, If, PlacesPredictionsInput } from '@components';
import { PlaceAutocompleteType } from '@googlemaps/google-maps-services-js';

import {
  PrimaryLocationFormData,
  PrimaryLocationFormProps,
  PrimaryLocationFormRef,
  primaryLocationFormSchema,
} from './types';

export const PrimaryLocationStep = forwardRef<
  PrimaryLocationFormRef,
  PrimaryLocationFormProps
>(
  (
    {
      defaultValues: defaultValuesExternal,
      containerStyle,
      onChangeText,
      onFormStateChange,
    },
    ref,
  ) => {
    const defaultValues: Partial<PrimaryLocationFormData> =
      defaultValuesExternal
        ? defaultValuesExternal
        : {
            isHeadOffice: true,
            parsed_location: {
              autocomplete_description: '',
              city: '',
              coords: '',
              country: '',
              formatted_address: '',
              latitude: 0,
              longitude: 0,
              place_id: '',
              region: '',
              street_name: '',
              street_number: '',
              street_address: '',
            },
            parsed_head_office_location: undefined,
          };

    const {
      control,
      formState: { isValid },
      handleSubmit,
      getValues,
      resetField,
      watch,
    } = useForm<PrimaryLocationFormData>({
      resolver: zodResolver(primaryLocationFormSchema),
      mode: 'onBlur',
      defaultValues,
    });

    const parsedLocation = watch('parsed_location');
    const isHeadOffice = watch('isHeadOffice');
    const parsedHeadOfficeLocation = watch('parsed_head_office_location');

    useImperativeHandle(ref, () => ({ handleSubmit, getValues }), [
      handleSubmit,
      getValues,
    ]);

    useEffect(() => {
      if (onFormStateChange) {
        onFormStateChange({ isValid });
      }
    }, [isValid, onFormStateChange]);

    return (
      <View style={containerStyle}>
        <AppText style={styles.organizationDetails}>
          Organization Details
        </AppText>

        <Controller
          control={control}
          name="parsed_location"
          render={({ field, fieldState }) => (
            <PlacesPredictionsInput
              inputProps={{
                placeholder: 'Search primary location',
                errorMessage: fieldState.error?.message,
              }}
              types={PlaceAutocompleteType.address}
              onChangeText={() => {
                resetField('parsed_location');
                onChangeText?.();
              }}
              onSelectPlace={res => field.onChange(res.parsed_details)}
              defaultValue={parsedLocation?.autocomplete_description}
            />
          )}
        />

        <Controller
          control={control}
          name="isHeadOffice"
          render={({ field }) => (
            <CheckboxList
              label="Is this location a head office?"
              containerStyle={styles.checkboxListContainer}
              items={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
              checkedValues={field.value ? 'yes' : 'no'}
              onCheckboxPress={item => field.onChange(item.value === 'yes')}
            />
          )}
        />

        <If condition={!isHeadOffice}>
          <Controller
            control={control}
            name="parsed_head_office_location"
            render={({ field, fieldState }) => (
              <PlacesPredictionsInput
                inputProps={{
                  placeholder: 'Search head office location',
                  errorMessage: fieldState.error?.message,
                }}
                types={PlaceAutocompleteType.address}
                onChangeText={() => {
                  resetField('parsed_head_office_location');
                  onChangeText?.();
                }}
                onSelectPlace={res => field.onChange(res.parsed_details)}
                defaultValue={
                  parsedHeadOfficeLocation?.autocomplete_description
                }
                containerStyle={styles.headOfficeLocationInput}
              />
            )}
          />
        </If>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  organizationDetails: {
    ...TYPOGRAPHY.medium_14,
    lineHeight: 20,
  },
  checkboxListContainer: {
    marginTop: 24,
  },
  headOfficeLocationInput: {
    marginTop: 24,
  },
});
