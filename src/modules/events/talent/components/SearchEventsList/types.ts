import { FlashListProps } from '@shopify/flash-list';
import { UseSearchPublicEventsBodyDto } from 'src/actions/events/useSearchPublicEvents/types';

export interface SearchEventsListProps
  extends Partial<Omit<FlashListProps<any>, 'data'>> {
  filters?: Omit<UseSearchPublicEventsBodyDto, 'limit' | 'offset'>;
}
