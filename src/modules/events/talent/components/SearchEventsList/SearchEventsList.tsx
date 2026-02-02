import { SearchEventsListProps } from './types';
import { useSearchEventsList } from './useSearchEventsList';
import { TalentEventsViewList } from '../TalentEventsViewList';
import { ITalentEventCard } from '../TalentEventCard';
import { styles } from './styles';
export const SearchEventsList = ({ ...props }: SearchEventsListProps) => {
  const { events, hasNextPage, isLoading, fetchNextPage, refetch } =
    useSearchEventsList(props);

  return (
    <TalentEventsViewList
      data={events as ITalentEventCard[]}
      isLoading={isLoading}
      contentContainerStyle={styles.listContentContainer}
      hasMoreItems={hasNextPage}
      onLoadMore={fetchNextPage}
      refetch={refetch}
      {...props}
    />
  );
};
