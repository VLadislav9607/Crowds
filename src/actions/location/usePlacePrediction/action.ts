import { GOOGLE_PLACES_API_KEY } from "@env";
import { UsePlacePredictionBodyDto } from "./types";
import { googleClient } from "@services";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";

export const getGooglePlacesAction = async (
    {
        query,
        language = "en",
        types,
        components = [],
        sessiontoken,
    }: UsePlacePredictionBodyDto,
): Promise<PlaceAutocompleteResult[]> => {

    const response = await googleClient.placeAutocomplete({
        params: {
            input: query,
            key: GOOGLE_PLACES_API_KEY,
            language,
            types,
            components,
            sessiontoken,
        },
    });


    return response.data.predictions;
};
