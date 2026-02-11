import { View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
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
import { queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const TalentLocationSetupForm = forwardRef<
  TalentLocationSetupFormRef,
  TalentLocationSetupFormProps
>(({ onFormStateChange, onSuccess }, ref) => {
  const { data: me } = useGetMe();

  const onUpsertLocationSuccess = async () => {
    await queryClient.invalidateQueries({
      queryKey: [TANSTACK_QUERY_KEYS.GET_ME],
    });
    onSuccess?.();
  };

  const {
    mutate: upsertTalentLocationMutate,
    isPending: isUpsertingLocation,
    error: upsertTalentLocationError,
  } = useUpsertTalentLocation({
    onSuccess: onUpsertLocationSuccess,
  });

  console.log('upsertTalentLocationError', upsertTalentLocationError);

  const talentLocation = me?.talent?.talent_location;

  const defaultValues: TalentLocationSetupFormData | undefined = useMemo(() => {
    return talentLocation
      ? {
          parsed_location: {
            ...talentLocation,
            coords: talentLocation.coords as string,
          },
        }
      : undefined;
  }, [talentLocation]);

  const { control, handleSubmit, reset, watch } =
    useForm<TalentLocationSetupFormData>({
      resolver: zodResolver(talentLocationSetupSchema),
      mode: 'onBlur',
      defaultValues,
    });

  const parsedLocation = watch('parsed_location');

  const onFormReset = () => parsedLocation?.autocomplete_description && reset();

  const upsertLocationHandler = useCallback(
    (data: TalentLocationSetupFormData) => {
      const isNothingChanged =
        defaultValues?.parsed_location.place_id &&
        defaultValues?.parsed_location?.place_id ===
          data.parsed_location.place_id;
      if (isNothingChanged) {
        onSuccess?.();
        return;
      }

      upsertTalentLocationMutate({
        location: {
          ...data.parsed_location,
          id: talentLocation?.id,
        },
      });
    },
    [
      defaultValues?.parsed_location.place_id,
      onSuccess,
      upsertTalentLocationMutate,
      talentLocation?.id,
    ],
  );

  useImperativeHandle(
    ref,
    () => ({
      handleSubmit: handleSubmit(upsertLocationHandler),
    }),
    [handleSubmit, upsertLocationHandler],
  );

  useEffect(() => {
    onFormStateChange?.({ isUpsertingLocation });
  }, [isUpsertingLocation, onFormStateChange]);

  return (
    <View style={styles.container}>
      {/* <AppText color="black" typography="semibold_18" margin={{ bottom: 16 }}>
        Where do you live?
      </AppText> */}

      <Controller
        control={control}
        name="parsed_location"
        render={({ field, fieldState }) => {
          console.log('fieldState', fieldState.error);
          return (
            <PlacesPredictionsInput
              types={PlaceAutocompleteType.cities}
              onChangeText={onFormReset}
              inputProps={{
                errorMessage: fieldState?.error?.message,
              }}
              onSelectPlace={res => field.onChange(res.parsed_details)}
              defaultValue={parsedLocation?.autocomplete_description}
            />
          );
        }}
      />
    </View>
  );
});
