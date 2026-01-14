import { FlashListProps } from '@shopify/flash-list';
import { ITalentEvent } from '@actions';
import { TalentEventStatus } from '../../../types';

export interface TalentEventsListProps
  extends Partial<Omit<FlashListProps<any>, 'data'>> {
  type: TalentEventStatus;
  data?: ITalentEvent[];
  isLoading?: boolean;
  isRefetching?: boolean;
  hasMoreItems?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
}
