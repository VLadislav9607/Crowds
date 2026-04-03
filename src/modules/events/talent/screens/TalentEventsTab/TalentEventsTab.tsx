import { useCallback, useMemo, useState } from 'react';
import {
  AppTabSelector,
  ITabOption,
  ScreenWrapper,
  AppFlashList,
  IPopupMenuItem,
} from '@components';
import {
  useTalentEventsByStatus,
  useTalentEventsCounts,
  useGetTalentEventHistory,
  TalentEventHistoryItem,
} from '@actions';
import { useRefetchQuery } from '@hooks';
import { goToScreen, Screens } from '@navigation';

import { TalentEventStatus, TalentEventsTabs } from '../../../types';
import { styles } from './styles';
import { TalentEventsViewList, EventHistoryCard } from '../../components';

const TAB_PARAMS: Record<
  Exclude<TalentEventsTabs, 'history'>,
  {
    status: TalentEventStatus;
    initiatedBy?: 'organization' | 'talent';
  }
> = {
  proposed: {
    status: 'pending',
    initiatedBy: 'organization',
  },
  pending: {
    status: 'pending',
    initiatedBy: 'talent',
  },
  approved: {
    status: 'approved',
  },
  denied: {
    status: 'rejected',
  },
};

export const TalentEventsTab = () => {
  const [selectedTab, setSelectedTab] = useState<TalentEventsTabs>('proposed');

  const isHistoryTab = selectedTab === 'history';

  const currentParams = useMemo(
    () => (isHistoryTab ? TAB_PARAMS.approved : TAB_PARAMS[selectedTab]),
    [selectedTab, isHistoryTab],
  );

  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useTalentEventsByStatus(currentParams, { enabled: !isHistoryTab });

  const {
    data: historyData,
    hasNextPage: historyHasNextPage,
    fetchNextPage: historyFetchNextPage,
    refetch: historyRefetch,
  } = useGetTalentEventHistory({ enabled: isHistoryTab });

  const {
    isRefetchingQuery: isHistoryRefetching,
    refetchQuery: refetchHistoryQuery,
  } = useRefetchQuery(historyRefetch);

  const {
    proposals,
    pending,
    approved,
    denied,
    history,
    refetch: refetchCounts,
  } = useTalentEventsCounts();

  const refetchAll = useCallback(async () => {
    await Promise.all([
      isHistoryTab ? historyRefetch() : refetch(),
      refetchCounts(),
    ]);
  }, [isHistoryTab, refetch, historyRefetch, refetchCounts]);

  const tabOptions: ITabOption<TalentEventsTabs>[] = useMemo(
    () => [
      {
        label: 'Proposals',
        value: 'proposed',
        badge: proposals || 0,
      },
      {
        label: 'Pending',
        value: 'pending',
        badge: pending || 0,
      },
      {
        label: 'Approved',
        value: 'approved',
        badge: approved || 0,
      },
      {
        label: 'Denied',
        value: 'denied',
        badge: denied || 0,
      },
      {
        label: 'Completed',
        value: 'history',
        badge: history || 0,
      },
    ],
    [proposals, pending, approved, denied, history],
  );

  const handleHistoryMenuSelect = useCallback(
    (item: TalentEventHistoryItem, menuItem: IPopupMenuItem) => {
      if (menuItem.value === 'flag_organization') {
        goToScreen(Screens.FlagOrganization, {
          eventId: item.event_id,
          officeId: item.office_id,
          brandName: item.brand_name,
          brandLogoPath: item.brand_logo_path,
        });
      }
    },
    [],
  );

  return (
    <ScreenWrapper
      headerVariant="withTitle"
      showBackButton={false}
      containerStyle={styles.container}
      title="Events"
      titleProps={{ style: styles.title }}
      headerStyles={styles.header}
      customElement={
        <AppTabSelector
          onSelect={value => setSelectedTab(value)}
          theme="black"
          options={tabOptions}
          selectedValue={selectedTab}
          containerStyle={styles.tabsContainer}
        />
      }
    >
      {isHistoryTab ? (
        <AppFlashList<TalentEventHistoryItem>
          data={historyData?.data ?? []}
          gap={8}
          renderItem={({ item }) => (
            <EventHistoryCard
              event={item}
              onMenuSelect={(menuItem: IPopupMenuItem) =>
                handleHistoryMenuSelect(item, menuItem)
              }
            />
          )}
          keyExtractor={item => item.event_id}
          contentContainerStyle={styles.historyListContent}
          emptyText="No past events yet"
          showBottomLoader={!!historyHasNextPage}
          onEndReached={() => historyHasNextPage && historyFetchNextPage()}
          onEndReachedThreshold={0.5}
          refreshing={isHistoryRefetching}
          onRefresh={refetchHistoryQuery}
          withBottomTab
        />
      ) : (
        <TalentEventsViewList
          data={data?.data || []}
          isLoading={isLoading}
          withBottomTab
          hasMoreItems={hasNextPage}
          refetch={refetchAll}
          onLoadMore={fetchNextPage}
          contentContainerStyle={styles.eventsListContent}
        />
      )}
    </ScreenWrapper>
  );
};
