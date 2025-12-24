import {
  AddressComponent,
  AddressType,
  PlaceDetailsResponseData,
} from '@googlemaps/google-maps-services-js';
import { ParsedLocationAdditionalFields } from './types';

export const generateGooglePlacesSessionToken = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const parseLocationAdditionalFields = (
  addressComponents: AddressComponent[],
): ParsedLocationAdditionalFields => {
  const result: ParsedLocationAdditionalFields = {};

  console.log('addressComponents', addressComponents);
  if (Array.isArray(addressComponents)) {
    addressComponents.forEach(component => {
      const types = component.types;

      if (types.includes(AddressType.street_number)) {
        result.street_number = component.long_name;
      } else if (types.includes(AddressType.route)) {
        result.street_name = component.long_name;
      } else if (types.includes(AddressType.sublocality)) {
        result.sublocality = component.long_name;
      } else if (types.includes(AddressType.locality)) {
        result.city = component.long_name;
      } else if (types.includes(AddressType.administrative_area_level_1)) {
        result.region = component.long_name;
      } else if (types.includes(AddressType.country)) {
        result.country = component.long_name;
      } else if (types.includes(AddressType.postal_code)) {
        result.postal_code = component.long_name;
      } else if (types.includes(AddressType.route)) {
        result.street_name = component.long_name;
      } else if (types.includes(AddressType.street_number)) {
        result.street_number = component.long_name;
      } else if (types.includes(AddressType.street_address)) {
        result.street_address = component.long_name;
      }
    });
  }

  return result;
};

export const parseGooglePlaceDetails = (
  placeId: string,
  autocompleteDescription: string,
  placeDetails: PlaceDetailsResponseData,
): ParsedLocationAdditionalFields => {
  const result = placeDetails.result;
  const location = result.geometry?.location;

  const coords = location ? `POINT(${location.lng} ${location.lat})` : null;
  const parsedAdditionalFields = parseLocationAdditionalFields(
    result.address_components || [],
  );

  const locationData = {
    place_id: placeId,
    autocomplete_description: autocompleteDescription,
    formatted_address: placeDetails?.result?.formatted_address || '',
    latitude: location?.lat || 0,
    longitude: location?.lng || 0,
    coords,
    ...parsedAdditionalFields,
  };

  console.log('locationData', locationData);

  return locationData;
};
