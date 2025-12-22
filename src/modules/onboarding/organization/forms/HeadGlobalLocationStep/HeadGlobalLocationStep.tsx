import { StyleSheet, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect, useImperativeHandle } from 'react';

import { AppText } from '@ui';
import { TYPOGRAPHY } from '@styles';
import { CheckboxList, PlacesPredictionsInput } from '@components';
import { PlaceAutocompleteType } from '@googlemaps/google-maps-services-js';

import {
  HeadGlobalLocationFormData,
  HeadGlobalLocationFormProps,
  HeadGlobalLocationFormRef,
  headGlobalLocationFormSchema,
} from './types';

export const HeadOfficeGlobalStep = forwardRef<
  HeadGlobalLocationFormRef,
  HeadGlobalLocationFormProps
>(({ defaultValues : defaultValuesExternal, containerStyle, onFormStateChange }, ref) => {


  const defaultValues: HeadGlobalLocationFormData = defaultValuesExternal ? defaultValuesExternal : {
    haveBranches: false,
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
    }
  };
  
  const {
    control,
    formState: { isValid },
    handleSubmit,
    getValues,
    reset,
    watch,
  } = useForm<HeadGlobalLocationFormData>({
    resolver: zodResolver(headGlobalLocationFormSchema),
    mode: 'onBlur',
    defaultValues
  });

  const parsedLocation = watch('parsed_location');

  const onFormReset = () => parsedLocation?.autocomplete_description && reset();
  

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
      <AppText style={styles.organizationDetails}>Organization Details</AppText>

      <Controller
        control={control}
        name="parsed_location"
        render={({ field, fieldState }) => (
          <PlacesPredictionsInput
            placeholder="Search head office location"
            types={PlaceAutocompleteType.address}
            onChangeText={onFormReset}
            errorMessage={fieldState.error?.message}
            onSelectPlace={res => field.onChange(res.parsed_details)}
            defaultValue={parsedLocation?.autocomplete_description}
          />
        )}
      />

      <Controller
        control={control}
        name="haveBranches"
        render={({ field }) => (
          <CheckboxList
            label="Do you have branches?"
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
    </View>
  );
});

const styles = StyleSheet.create({
  organizationDetails: {
    ...TYPOGRAPHY.medium_14,
    lineHeight: 20,
  },
  checkboxListContainer: {
    marginTop: 24,
  },
});
