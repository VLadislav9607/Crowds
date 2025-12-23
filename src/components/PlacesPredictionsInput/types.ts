import { PlaceAutocompleteType, PlaceDetailsResponseData } from "@googlemaps/google-maps-services-js";
import { ViewStyle } from "react-native";

export interface ParsedLocationAdditionalFields {
    street_number?: string;
    street_name?: string;
    sublocality?: string;
    city?: string;
    region?: string;
    country?: string;
    postal_code?: string;
};

export interface PlacesPredictionsInputPlace {
    raw_details: PlaceDetailsResponseData['result'];
    parsed_details: ParsedLocationAdditionalFields;
    autocomplete_descripton: string;
}

export interface PlacesPredictionsInputProps {
    placeholder?: string;
    defaultValue?: string;
    containerStyle?: ViewStyle;
    types?: PlaceAutocompleteType,
    errorMessage?: string;
    onSelectPlace?: (place: PlacesPredictionsInputPlace) => void;
    onChangeText?: (text: string) => void;
}

