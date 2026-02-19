import { GOOGLE_PLACES_API_KEY } from '@env';
import { UsePlacePredictionBodyDto } from './types';
import { googleClient } from '@services';
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js';

const BASE_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

export const getGooglePlacesAction = async ({
  query,
  language = 'en',
  types,
  components = [],
  sessiontoken,
}: UsePlacePredictionBodyDto): Promise<PlaceAutocompleteResult[]> => {
  const response = await googleClient.placeAutocomplete({
    params: {
      input: query,
      key: GOOGLE_PLACES_API_KEY,
      language,
      types,
      sessiontoken,
      components,
    },
    url: BASE_URL,
  });

  return response.data.predictions;
};
