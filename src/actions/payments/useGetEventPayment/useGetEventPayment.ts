import { useQuery } from '@tanstack/react-query';
import { IQueryOptions } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { getEventPaymentAction } from './action';
import { EventPaymentDto } from './types';

export const useGetEventPayment = (
  eventId: string | undefined,
  options?: IQueryOptions<EventPaymentDto | null>,
) => {
  return useQuery({
    queryKey: [TANSTACK_QUERY_KEYS.GET_EVENT_PAYMENT, eventId],
    queryFn: () => getEventPaymentAction(eventId!),
    enabled: !!eventId,
    ...options,
  });
};
