import { Language, LatLng } from '@googlemaps/google-maps-services-js';

export interface UsePlaceTimezoneBodyDto {
  location: LatLng;
  timestamp?: Date | number;
  language?: Language;
}
