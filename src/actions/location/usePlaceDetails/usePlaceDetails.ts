import { getPlaceDetailsAction } from "./action";
import { useMutation } from "@tanstack/react-query";
import { IMutationOptions } from "@services";
import { PlaceDetailsResponseData } from "@googlemaps/google-maps-services-js";

export const usePlaceDetails = (
    options?: IMutationOptions<PlaceDetailsResponseData>,
) => {
    return useMutation({
        mutationFn: getPlaceDetailsAction,
        ...options,
    });
};

