import {
  PlaceAutocompleteType,
  PlaceDetailsResponseData,
  TimeZoneResponseData,
} from '@googlemaps/google-maps-services-js';
import { ViewStyle } from 'react-native';
import { AppInputProps } from '@ui';

export interface ParsedLocationAdditionalFields {
  street_address?: string;
  street_number?: string;
  street_name?: string;
  sublocality?: string;
  city?: string;
  region?: string;
  country?: string;
  country_code?: string;
  postal_code?: string;
}

export interface PlacesPredictionsInputPlace {
  raw_details: PlaceDetailsResponseData['result'];
  parsed_details: ParsedLocationAdditionalFields;
  autocomplete_descripton: string;
  timezone?: TimeZoneResponseData;
}

export interface PlacesPredictionsInputProps {
  defaultValue?: string;
  containerStyle?: ViewStyle;
  types?: PlaceAutocompleteType;
  components?: string[];
  inputProps?: Omit<AppInputProps, 'value' | 'onChangeText'>;
  onSelectPlace?: (place: PlacesPredictionsInputPlace) => void;
  onChangeText?: (text: string) => void;
  includeTimezone?: boolean;
}
