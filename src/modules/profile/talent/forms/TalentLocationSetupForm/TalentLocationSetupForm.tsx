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
import { AppInput, AppText } from '@ui';
import {
  TalentLocationSetupFormData,
  TalentLocationSetupFormProps,
  TalentLocationSetupFormRef,
  talentLocationSetupSchema,
} from './types';
import { PlaceAutocompleteType } from '@googlemaps/google-maps-services-js';
import { useGetMe, useUpsertTalentLocation } from '@actions';
import { styles } from './styles';
import { queryClient, supabase } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const TalentLocationSetupForm = forwardRef<
  TalentLocationSetupFormRef,
  TalentLocationSetupFormProps
>(({ onFormStateChange, onSuccess }, ref) => {
  const { data: me } = useGetMe();

  const onUpsertLocationSuccess = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_ME],
      }),
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.SEARCH_PUBLIC_EVENTS],
      }),
    ]);
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
      ? ({
          parsed_location: {
            ...talentLocation,
            coords: talentLocation.coords as string,
          },
          tax_identification_number:
            ((me?.talent as Record<string, unknown>)
              ?.tax_identification_number as string) ?? '',
        } as TalentLocationSetupFormData)
      : undefined;
  }, [talentLocation, me?.talent]);

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
      const isLocationChanged =
        !defaultValues?.parsed_location.place_id ||
        defaultValues?.parsed_location?.place_id !==
          data.parsed_location.place_id;
      const isTinChanged =
        defaultValues?.tax_identification_number !==
        data.tax_identification_number;

      if (!isLocationChanged && !isTinChanged) {
        onSuccess?.();
        return;
      }

      if (data.tax_identification_number) {
        supabase
          .from('user_kyc')
          .update({
            tax_identification_number: data.tax_identification_number,
          } as Record<string, unknown>)
          .eq('user_id', me?.talent?.id ?? '')
          .then();
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
      defaultValues?.tax_identification_number,
      onSuccess,
      upsertTalentLocationMutate,
      talentLocation?.id,
      me?.talent?.id,
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
      <Controller
        control={control}
        name="parsed_location"
        render={({ field, fieldState }) => {
          return (
            <PlacesPredictionsInput
              types={PlaceAutocompleteType.cities}
              includeTimezone
              onChangeText={onFormReset}
              inputProps={{
                errorMessage: fieldState?.error?.message,
              }}
              onSelectPlace={res =>
                field.onChange({
                  ...res.parsed_details,
                  timezone: res.timezone?.timeZoneId,
                })
              }
              defaultValue={parsedLocation?.autocomplete_description}
            />
          );
        }}
      />

      <AppText
        color="main"
        typography="medium_12"
        margin={{ top: 24, bottom: 8 }}
      >
        We collect this to meet tax requirements so you can get paid without any
        hiccups. Your information is kept safe and only used where required.
      </AppText>

      <Controller
        control={control}
        name="tax_identification_number"
        render={({ field, fieldState }) => (
          <AppInput
            label="Tax Identification Number"
            placeholder="Enter your tax identification number"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
    </View>
  );
});
