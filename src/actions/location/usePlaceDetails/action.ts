import { GOOGLE_PLACES_API_KEY } from '@env';
import { UsePlaceDetailsBodyDto } from './types';
import { googleClient } from '@services';
import {
  Language,
  PlaceDetailsResponseData,
} from '@googlemaps/google-maps-services-js';

export const getPlaceDetailsAction = async ({
  place_id,
  region,
  sessiontoken,
  language = Language.en,
  fields,
}: UsePlaceDetailsBodyDto): Promise<PlaceDetailsResponseData> => {
  const response = await googleClient.placeDetails({
    params: {
      place_id,
      key: GOOGLE_PLACES_API_KEY,
      sessiontoken,
      region,
      language,
      fields,
    },
  });

  return response.data;
};
