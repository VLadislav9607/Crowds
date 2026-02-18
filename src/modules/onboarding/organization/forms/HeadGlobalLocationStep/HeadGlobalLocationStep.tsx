import { StyleSheet, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { AppText } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';
import { AppImage, PlacesPredictionsInput } from '@components';
import { PlaceAutocompleteType } from '@googlemaps/google-maps-services-js';

import {
  HeadGlobalLocationFormData,
  HeadGlobalLocationFormProps,
  HeadGlobalLocationFormRef,
  headGlobalLocationFormSchema,
} from './types';
import { ICONS } from '@assets';
import { SvgXml } from 'react-native-svg';
import {
  ImageSourcePickerModal,
  ImageSourcePickerModalData,
} from '@modules/common';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export const HeadGlobalLocationStep = forwardRef<
  HeadGlobalLocationFormRef,
  HeadGlobalLocationFormProps
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

    const defaultValues: HeadGlobalLocationFormData | undefined =
      defaultValuesExternal ? defaultValuesExternal : undefined;

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
      defaultValues: defaultValues,
    });

    const parsedLocation = watch('parsed_location');

    const onFormReset = () =>
      parsedLocation?.autocomplete_description && reset();

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
          Organization Location
        </AppText>

        <Controller
          control={control}
          name="parsed_location"
          render={({ field, fieldState }) => (
            <PlacesPredictionsInput
              inputProps={{
                placeholder: 'Search office location',
                errorMessage: fieldState.error?.message,
              }}
              types={PlaceAutocompleteType.address}
              onChangeText={() => {
                onFormReset();
                onChangeText?.();
              }}
              onSelectPlace={res => field.onChange(res.parsed_details)}
              defaultValue={parsedLocation?.autocomplete_description}
            />
          )}
        />

        <View>
          <AppText
            typography="medium_14"
            color="black"
            margin={{ bottom: 14, top: 20 }}
          >
            Add you Logo/Brand
          </AppText>
          <AppImage
            onPress={() =>
              imageSourcePickerModalRef.current?.present({
                onImagePicked: logo => {
                  onPickLogo?.({
                    uri: logo.uri,
                    type: logo.type,
                    size: logo.size!,
                    name: logo.name,
                  });
                  imageSourcePickerModalRef.current?.dismiss();
                },
              })
            }
            imgUri={pickedLogo?.uri}
            containerStyle={styles.imageContainer}
            bucket="brand_avatars"
            placeholderIcon={ICONS.orgAvatarLogo('lihgt_gray4')}
            CustomElements={
              <View style={styles.cameraWrapper}>
                <SvgXml width={14} height={14} xml={ICONS.camera('black')} />
              </View>
            }
          />
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
