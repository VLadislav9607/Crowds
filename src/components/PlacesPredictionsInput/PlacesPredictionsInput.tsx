import { useState } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator, Keyboard } from "react-native";
import { styles } from "./styles";
import { PlacesPredictionsInputProps } from "./types";
import { AppInput } from "@ui";
import { usePlaceDetails, usePlacePrediction } from "@actions";
import { useDebounce, useDidUpdateEffect } from "@hooks";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";
import { If } from "../If";
import { generateGooglePlacesSessionToken, parseGooglePlaceDetails } from "./helper";


export const PlacesPredictionsInput = ({ containerStyle, types, errorMessage, defaultValue='', onSelectPlace, onChangeText, placeholder='Search' }: PlacesPredictionsInputProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [listViewDisplayed, setListViewDisplayed] = useState(false);
  const [sessionToken, setSessionToken] = useState<string>(generateGooglePlacesSessionToken());
  const debouncedInputValue = useDebounce(inputValue, 300);

  const { data: predictions = [] } = usePlacePrediction({
    query: debouncedInputValue,
    sessiontoken: sessionToken,
    types,
  });

  const { mutateAsync: getPlaceDetailsMutateAsync, isPending: isDetailsLoading } = usePlaceDetails({
    onSuccess: () => setSessionToken(generateGooglePlacesSessionToken())
  });


  const handleTextChange = (text: string) => {
    setInputValue(text);
    onChangeText?.(text);
    if (!listViewDisplayed && text.length > 0) {
      setListViewDisplayed(true);
    }
  };

  const handleSelectPlace = async (prediction: PlaceAutocompleteResult) => {
    setListViewDisplayed(false);
    Keyboard.dismiss();
    const result = await getPlaceDetailsMutateAsync({
      place_id: prediction.place_id,
      sessiontoken: sessionToken
    });

    setInputValue(prediction.description);
    onSelectPlace?.({
      raw_details: result.result,
      parsed_details: parseGooglePlaceDetails(prediction.place_id, prediction.description, result),
      autocomplete_descripton: prediction.description
    });
  };

  useDidUpdateEffect(() => {
    !inputValue && setSessionToken(generateGooglePlacesSessionToken());
  }, [inputValue]);

  return (
    <View style={containerStyle}>
      
      <AppInput
        placeholder={placeholder}
        value={inputValue}
        errorMessage={errorMessage}
        onChangeText={handleTextChange}
      />

      <If condition={isDetailsLoading}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#666" />
        </View>
      </If>

      <If condition={listViewDisplayed && !!predictions.length && !isDetailsLoading && !!debouncedInputValue}>
        <View style={styles.listContainer}>
          {predictions.map(prediction => (
            <TouchableOpacity key={prediction.place_id} style={styles.row} onPress={() => handleSelectPlace(prediction)} activeOpacity={0.7}>
              <Text style={styles.rowText}>{prediction.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </If>

    </View>
  );
};

