import { Keyboard, StyleSheet, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { AppInput, AppText } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';
import {
  AppImage,
  CheckboxList,
  If,
  PlacesPredictionsInput,
} from '@components';
import { PlaceAutocompleteType } from '@googlemaps/google-maps-services-js';

import {
  PrimaryLocationFormData,
  PrimaryLocationFormProps,
  PrimaryLocationFormRef,
  primaryLocationFormSchema,
} from './types';
import { ICONS } from '@assets';
import { SvgXml } from 'react-native-svg';
import {
  ImageSourcePickerModal,
  ImageSourcePickerModalData,
} from '@modules/common';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export const PrimaryLocationStep = forwardRef<
  PrimaryLocationFormRef,
  PrimaryLocationFormProps
>(
  (
    {
      defaultValues: defaultValuesExternal,
      containerStyle,
      pickedLogo,
      onPickLogo,
      onChangeText,
      onFormStateChange,
    },
    ref,
  ) => {
    const imageSourcePickerModalRef =
      useRef<BottomSheetModal<ImageSourcePickerModalData>>(null);

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
              country_code: '',
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
      formState: { isValid, errors },
      handleSubmit,
      getValues,
      resetField,
      watch,
    } = useForm<PrimaryLocationFormData>({
      resolver: zodResolver(primaryLocationFormSchema),
      mode: 'onBlur',
      defaultValues,
    });

    console.log('errors', errors);

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
          Search your primary location
        </AppText>

        <Controller
          control={control}
          name="parsed_location"
          render={({ field, fieldState }) => {
            console.log('fieldState', field);
            return (
              <PlacesPredictionsInput
                inputProps={{
                  placeholder: 'Search primary location',
                  errorMessage: fieldState.error?.message,
                }}
                types={PlaceAutocompleteType.address}
                onChangeText={() => {
                  resetField('parsed_location', {
                    defaultValue: {
                      autocomplete_description: '',
                      city: '',
                      coords: '',
                      country: '',
                      country_code: '',
                      formatted_address: '',
                      latitude: 0,
                      longitude: 0,
                      place_id: '',
                      region: '',
                      street_name: '',
                      street_number: '',
                      street_address: '',
                    },
                  });
                  onChangeText?.();
                }}
                onSelectPlace={res => field.onChange(res.parsed_details)}
                defaultValue={parsedLocation?.autocomplete_description}
              />
            );
          }}
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
                  resetField('parsed_head_office_location', {
                    defaultValue: {
                      autocomplete_description: '',
                      city: '',
                      coords: '',
                      country: '',
                      country_code: '',
                      formatted_address: '',
                      latitude: 0,
                      longitude: 0,
                      place_id: '',
                      region: '',
                      street_name: '',
                      street_number: '',
                      street_address: '',
                    },
                  });
                  onChangeText?.();
                }}
                onSelectPlace={res => field.onChange(res.parsed_details)}
                defaultValue={
                  parsedHeadOfficeLocation?.autocomplete_description
                }
                containerStyle={styles.checkboxListContainer}
              />
            )}
          />
        </If>

        <Controller
          control={control}
          name="vat_number"
          render={({ field, fieldState }) => (
            <AppInput
              label="GST/VAT Number"
              placeholder="Enter your GST/VAT number"
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
              containerStyle={styles.checkboxListContainer}
            />
          )}
        />

        <View>
          <AppText
            typography="medium_14"
            color="black"
            margin={{ bottom: 14, top: 20 }}
          >
            Add your Logo/Brand
          </AppText>
          <AppImage
            imgUri={pickedLogo?.uri}
            onPress={() => {
              Keyboard.dismiss();
              imageSourcePickerModalRef.current?.present({
                onImagePicked: logo => {
                  onPickLogo?.({
                    uri: logo.uri,
                    type: logo.type,
                    size: logo.size!,
                    name: logo.name,
                  });
                },
              });
            }}
            containerStyle={styles.imageContainer}
            bucket="brand_avatars"
            placeholderIcon={ICONS.orgAvatarLogo('lihgt_gray4')}
            CustomElements={
              <View style={styles.cameraWrapper}>
                <SvgXml width={14} height={14} xml={ICONS.camera('black')} />
              </View>
            }
          />

          <AppText
            typography="regular_14"
            color="gray_primary"
            margin={{ top: 14 }}
          >
            Max 3MB, JPEG or PNG. Your logo will not be seen by anyone until you
            have an approved event and approved talent under signed NDA. Only a
            category icon will be seen by the public.
          </AppText>
        </View>

        <ImageSourcePickerModal
          bottomSheetRef={imageSourcePickerModalRef}
          validateForBucket="brand_avatars"
        />
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
  imageContainer: {
    width: 148,
    height: 148,
    backgroundColor: COLORS.gray_bg,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cameraWrapper: {
    width: 22,
    height: 22,
    borderRadius: 100,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 6,
    right: 6,
  },
});
