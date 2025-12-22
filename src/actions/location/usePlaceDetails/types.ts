import { Language } from "@googlemaps/google-maps-services-js";

export interface UsePlaceDetailsBodyDto {
    place_id: string;
    language?: Language;
    region?: string;
    sessiontoken?: string;
    fields?: string[];
}

