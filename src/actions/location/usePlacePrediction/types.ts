import { PlaceAutocompleteType } from "@googlemaps/google-maps-services-js";

export interface UsePlacePredictionBodyDto  {
    query: string;
    language?: string;
    types?: PlaceAutocompleteType;
    components?: string[];
    sessiontoken?: string;
}

