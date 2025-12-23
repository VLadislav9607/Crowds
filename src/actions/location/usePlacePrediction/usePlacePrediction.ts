import { getGooglePlacesAction } from "./action";
import { UsePlacePredictionBodyDto } from "./types";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { TANSTACK_QUERY_KEYS } from "@constants";
import { IQueryOptions } from "@services";
import { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";

export const usePlacePrediction = (
    body: UsePlacePredictionBodyDto,
    options?: IQueryOptions<PlaceAutocompleteResult[]>,
) => {
    return useQuery({
        queryKey: [
            TANSTACK_QUERY_KEYS.PLACES_AUTOCOMPLETE,
            JSON.stringify(body),
        ],
        queryFn: async () => await getGooglePlacesAction(body),
        enabled: !!body.query,
        placeholderData: keepPreviousData,
        ...options,
    });
};
