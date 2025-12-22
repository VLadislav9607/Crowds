import { View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { PlacesPredictionsInput } from '@components';
import {
  TalentLocationSetupFormData,
  TalentLocationSetupFormProps,
  TalentLocationSetupFormRef,
  talentLocationSetupSchema,
} from './types';
import { PlaceAutocompleteType } from '@googlemaps/google-maps-services-js';
import { useGetMe, useUpsertTalentLocation } from '@actions';
import { styles } from './styles';



export const TalentLocationSetupForm = forwardRef<
  TalentLocationSetupFormRef,
  TalentLocationSetupFormProps
>(({ onFormStateChange, onSuccess }, ref) => {
  const { data: me } = useGetMe();
  const { mutate: upsertTalentLocationMutate, isPending: isUpsertingLocation } = useUpsertTalentLocation();

  const talentLocation = me?.talent?.talent_location;

  const defaultValues: TalentLocationSetupFormData | undefined = talentLocation ? {
    parsed_location: {
      ...talentLocation,
      coords: talentLocation.coords as string,
    },
  } : undefined;

  const { control, handleSubmit, reset, watch } =
    useForm<TalentLocationSetupFormData>({
      resolver: zodResolver(talentLocationSetupSchema),
      mode: 'onBlur',
      defaultValues
    });

  const parsedLocation = watch('parsed_location');

  const onFormReset = () => parsedLocation?.autocomplete_description && reset();

  const createUpdateLocationHandler = (data: TalentLocationSetupFormData) => {
    if (defaultValues?.parsed_location.place_id && defaultValues?.parsed_location?.place_id === data.parsed_location.place_id) {
      onSuccess?.();
      return;
    }

    upsertTalentLocationMutate(
      { location: { ...data.parsed_location, id: talentLocation?.id } },
      { onSuccess }
    );
  };

  useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit(createUpdateLocationHandler),
  }), [handleSubmit]);

  useEffect(() => {
    onFormStateChange?.({ isUpsertingLocation });
  }, [isUpsertingLocation, onFormStateChange]);

  return (
    <View style={styles.container} >
      {/* <AppText color="black" typography="semibold_18" margin={{ bottom: 16 }}>
        Where do you live?
      </AppText> */}

      <Controller
        control={control}
        name="parsed_location"
        render={({ field, fieldState }) => {
          return (
            <PlacesPredictionsInput
              types={PlaceAutocompleteType.cities}
              onChangeText={onFormReset}
              errorMessage={fieldState?.error?.message}
              onSelectPlace={res => field.onChange(res.parsed_details)}
              defaultValue={parsedLocation?.autocomplete_description}
            />
          )
        }}
      />

    </View>
  );
});
