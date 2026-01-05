import { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { styles } from './styles';
import { PlacesPredictionsInputProps } from './types';
import { AppInput } from '@ui';
import {
  usePlaceDetails,
  usePlacePrediction,
  usePlaceTimezone,
} from '@actions';
import { useBoolean, useDebounce, useDidUpdateEffect } from '@hooks';
import {
  AddressType,
  PlaceAutocompleteResult,
  PlaceAutocompleteType,
  TimeZoneResponseData,
} from '@googlemaps/google-maps-services-js';
import { If } from '../If';
import {
  generateGooglePlacesSessionToken,
  parseGooglePlaceDetails,
} from './helper';
import { showInfoToast } from '@helpers';

export const PlacesPredictionsInput = ({
  containerStyle,
  types,
  defaultValue = '',
  onSelectPlace,
  onChangeText,
  includeTimezone = false,
  inputProps,
}: PlacesPredictionsInputProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [listViewDisplayed, setListViewDisplayed] = useState(false);
  const [sessionToken, setSessionToken] = useState<string>(
    generateGooglePlacesSessionToken(),
  );
  const debouncedInputValue = useDebounce(inputValue, 300);

  const { data: predictions = [] } = usePlacePrediction({
    query: debouncedInputValue,
    sessiontoken: sessionToken,
    types: PlaceAutocompleteType.address,
  });

  const { mutateAsync: getPlaceTimezoneMutateAsync } = usePlaceTimezone();

  const { mutateAsync: getPlaceDetailsMutateAsync } = usePlaceDetails({
    onSuccess: () => setSessionToken(generateGooglePlacesSessionToken()),
  });

  const {
    value: isDetailsLoading,
    setTrue: setIsDetailsLoadingTrue,
    setFalse: setIsDetailsLoadingFalse,
  } = useBoolean();

  const handleTextChange = (text: string) => {
    setInputValue(text);
    onChangeText?.(text);
    if (!listViewDisplayed && text.length > 0) {
      setListViewDisplayed(true);
    }
  };

  const handleSelectPlace = async (prediction: PlaceAutocompleteResult) => {
    setListViewDisplayed(false);
    setIsDetailsLoadingTrue();
    const detailsResponse = await getPlaceDetailsMutateAsync({
      place_id: prediction.place_id,
      sessiontoken: sessionToken,
    });

    if (
      types === PlaceAutocompleteType.address &&
      !detailsResponse.result.address_components?.some(component =>
        component.types.includes(AddressType.street_number),
      )
    ) {
      showInfoToast('Please select a full street address with street number');
      setListViewDisplayed(true);
      setIsDetailsLoadingFalse();
      return;
    }

    Keyboard.dismiss();

    let timezoneResponse: TimeZoneResponseData | undefined;

    if (includeTimezone) {
      timezoneResponse = await getPlaceTimezoneMutateAsync({
        location: {
          lat: detailsResponse.result.geometry?.location?.lat || 0,
          lng: detailsResponse.result.geometry?.location?.lng || 0,
        },
      });
    }
    setIsDetailsLoadingFalse();

    setInputValue(prediction.description);
    onSelectPlace?.({
      raw_details: detailsResponse.result,
      parsed_details: parseGooglePlaceDetails(
        prediction.place_id,
        prediction.description,
        detailsResponse,
      ),
      autocomplete_descripton: prediction.description,
      timezone: timezoneResponse,
    });
  };

  useDidUpdateEffect(() => {
    !inputValue && setSessionToken(generateGooglePlacesSessionToken());
  }, [inputValue]);

  return (
    <View style={containerStyle}>
      <AppInput
        value={inputValue}
        onChangeText={handleTextChange}
        numberOfLines={1}
        placeholder="Search"
        {...inputProps}
      />

      <If condition={isDetailsLoading}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#666" />
        </View>
      </If>

      <If
        condition={
          listViewDisplayed &&
          !!predictions.length &&
          !isDetailsLoading &&
          !!debouncedInputValue
        }
      >
        <View style={styles.listContainer}>
          {predictions.map(prediction => (
            <TouchableOpacity
              key={prediction.place_id}
              style={styles.row}
              onPress={() => handleSelectPlace(prediction)}
              activeOpacity={0.7}
            >
              <Text style={styles.rowText}>{prediction.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </If>
    </View>
  );
};
