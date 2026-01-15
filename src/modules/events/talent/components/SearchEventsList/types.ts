import { TalentPublicEventsBodyDto } from '@actions';
import { FlashListProps } from '@shopify/flash-list';

export interface SearchEventsListProps
  extends Partial<Omit<FlashListProps<any>, 'data'>> {
  filters?: Omit<TalentPublicEventsBodyDto, 'limit' | 'offset'>;
}
