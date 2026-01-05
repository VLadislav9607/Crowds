import { getPlaceTimezoneAction } from './action';
import { useMutation } from '@tanstack/react-query';
import { IMutationOptions } from '@services';
import { TimeZoneResponseData } from '@googlemaps/google-maps-services-js';

export const usePlaceTimezone = (
  options?: IMutationOptions<TimeZoneResponseData>,
) => {
  return useMutation({
    mutationFn: getPlaceTimezoneAction,
    ...options,
  });
};
