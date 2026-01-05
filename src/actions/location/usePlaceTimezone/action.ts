import { GOOGLE_PLACES_API_KEY } from '@env';
import { UsePlaceTimezoneBodyDto } from './types';
import { googleClient } from '@services';
import {
  Language,
  TimeZoneResponseData,
} from '@googlemaps/google-maps-services-js';

export const getPlaceTimezoneAction = async ({
  location,
  timestamp = new Date(),
  language = Language.en,
}: UsePlaceTimezoneBodyDto): Promise<TimeZoneResponseData> => {
  // Convert Date to Unix timestamp in seconds if needed
  const timestampValue =
    timestamp instanceof Date
      ? Math.floor(timestamp.getTime() / 1000)
      : timestamp;

  const response = await googleClient.timezone({
    params: {
      location,
      timestamp: timestampValue,
      key: GOOGLE_PLACES_API_KEY,
      language,
    },
  });

  return response.data;
};
