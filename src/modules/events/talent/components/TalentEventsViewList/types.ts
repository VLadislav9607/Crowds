import { FlashListProps } from '@shopify/flash-list';
import { ITalentEventCard } from '../TalentEventCard/types';
import { TalentEventCardProps } from '../TalentEventCard/types';

export interface TalentEventsViewListProps
  extends Partial<
    Omit<FlashListProps<any>, 'data' | 'onRefresh' | 'refreshing'>
  > {
  data?: ITalentEventCard[];
  isLoading?: boolean;
  hasMoreItems?: boolean;
  withBottomTab?: boolean;
  refetch: () => Promise<unknown>;
  onLoadMore?: () => void;
  cardProps?: Pick<
    TalentEventCardProps,
    'hideRejectButton' | 'containerStyle' | 'folderId'
  >;
}
