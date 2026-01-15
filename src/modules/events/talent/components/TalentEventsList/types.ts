import { FlashListProps } from '@shopify/flash-list';
import { ITalentEventCard } from '@actions';
import { TalentEventStatus } from '../../../types';

export interface TalentEventsListProps
  extends Partial<Omit<FlashListProps<any>, 'data'>> {
  type: TalentEventStatus;
  data?: ITalentEventCard[];
  isLoading?: boolean;
  isRefetching?: boolean;
  hasMoreItems?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
}
