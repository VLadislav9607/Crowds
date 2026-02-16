import { View } from 'react-native';
import {
  Skeleton,
  ScreenWrapper,
  AppFlashList,
  IPopupMenuItem,
} from '@components';
import { useGetTalentEventHistory, TalentEventHistoryItem } from '@actions';
import { useRefetchQuery } from '@hooks';
import { goToScreen, Screens } from '@navigation';
import { EventHistoryCard } from '../../components';
import { styles } from './styles';

const HistorySkeleton = () => (
  <View style={{ gap: 12, paddingTop: 8 }}>
    {Array.from({ length: 4 }).map((_, i) => (
      <Skeleton key={i}>
        <Skeleton.Item width="100%" height={160} borderRadius={6} />
      </Skeleton>
    ))}
  </View>
);

export const TalentEventHistoryScreen = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useGetTalentEventHistory();

  const { isRefetchingQuery, refetchQuery } = useRefetchQuery(refetch);

  const events = data?.data ?? [];

  return (
    <ScreenWrapper
      headerVariant="withTitle"
      colorHeader="black"
      title="Event History"
    >
      <AppFlashList<TalentEventHistoryItem>
        data={events}
        gap={8}
        renderItem={({ item }) => (
          <EventHistoryCard
            event={item}
            onMenuSelect={(menuItem: IPopupMenuItem) => {
              if (menuItem.value === 'flag_organization') {
                goToScreen(Screens.FlagOrganization, {
                  eventId: item.event_id,
                  officeId: item.office_id,
                  brandName: item.brand_name,
                  brandLogoPath: item.brand_logo_path,
                });
              }
            }}
          />
        )}
        keyExtractor={item => item.event_id}
        contentContainerStyle={styles.contentContainer}
        emptyText="No past events yet"
        skeleton={isLoading ? <HistorySkeleton /> : undefined}
        showBottomLoader={!!hasNextPage}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        refreshing={isRefetchingQuery}
        onRefresh={refetchQuery}
      />
    </ScreenWrapper>
  );
};
