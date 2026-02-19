import { useCallback, useMemo, useState } from 'react';
import { AppTabSelector, ITabOption, ScreenWrapper } from '@components';
import { useTalentEventsByStatus, useTalentEventsCounts } from '@actions';

import { TalentEventStatus, TalentEventsTabs } from '../../../types';
import { styles } from './styles';
import { TalentEventsViewList } from '../../components';

const TAB_PARAMS: Record<
  TalentEventsTabs,
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

  const currentParams = useMemo(() => TAB_PARAMS[selectedTab], [selectedTab]);

  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useTalentEventsByStatus(currentParams);

  const {
    proposals,
    pending,
    approved,
    denied,
    refetch: refetchCounts,
  } = useTalentEventsCounts();

  const refetchAll = useCallback(async () => {
    await Promise.all([refetch(), refetchCounts()]);
  }, [refetch, refetchCounts]);

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
    ],
    [proposals, pending, approved, denied],
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
      <TalentEventsViewList
        data={data?.data || []}
        isLoading={isLoading}
        withBottomTab
        hasMoreItems={hasNextPage}
        refetch={refetchAll}
        onLoadMore={fetchNextPage}
        contentContainerStyle={styles.eventsListContent}
      />
    </ScreenWrapper>
  );
};
