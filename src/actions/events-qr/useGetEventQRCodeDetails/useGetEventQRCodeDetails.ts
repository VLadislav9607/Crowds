import { TANSTACK_QUERY_KEYS } from '@constants';
import {
  UseGetEventQRCodeDetailsBodyDto,
  UseGetEventQRCodeDetailsResDto,
} from './types';
import { useQuery } from '@tanstack/react-query';
import { getEventQRCodeDetailsAction } from './action';
import { IQueryOptions } from '@services';

export const useGetEventQRCodeDetails = (
  body: UseGetEventQRCodeDetailsBodyDto,
  options?: IQueryOptions<UseGetEventQRCodeDetailsResDto>,
) => {
  return useQuery({
    queryKey: [
      TANSTACK_QUERY_KEYS.GET_EVENT_QR_CODE_DETAILS,
      body.qr_id,
      JSON.stringify(body),
    ],
    queryFn: async () => await getEventQRCodeDetailsAction(body),
    ...options,
  });
};
