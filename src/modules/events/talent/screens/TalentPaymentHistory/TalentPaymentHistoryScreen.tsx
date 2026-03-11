import { useState } from 'react';
import { View } from 'react-native';
import {
  Skeleton,
  ScreenWrapper,
  AppFlashList,
  AppTabSelector,
} from '@components';
import {
  useGetTalentPaymentHistory,
  TalentPaymentHistoryItem,
  PaymentHistoryTab,
} from '@actions';
import { useRefetchQuery } from '@hooks';
import { ITabOption } from '@components';
import { PaymentHistoryCard } from '../../components';
import { styles } from './styles';

const TAB_OPTIONS: ITabOption<PaymentHistoryTab>[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Paid', value: 'paid' },
];

const PaymentSkeleton = () => (
  <View style={styles.skeletonContainer}>
    {Array.from({ length: 4 }).map((_, i) => (
      <Skeleton key={i}>
        <Skeleton.Item width="100%" height={160} borderRadius={6} />
      </Skeleton>
    ))}
  </View>
);

export const TalentPaymentHistoryScreen = () => {
  const [activeTab, setActiveTab] = useState<PaymentHistoryTab>('pending');

  const { data, isLoading, hasNextPage, fetchNextPage, refetch } =
    useGetTalentPaymentHistory(activeTab);

  const { isRefetchingQuery, refetchQuery } = useRefetchQuery(refetch);

  const events = data?.data ?? [];

  return (
    <ScreenWrapper
      headerVariant="withTitle"
      colorHeader="black"
      title="Payment History"
      containerStyle={styles.screenContainer}
    >
      <View style={styles.tabContainer}>
        <AppTabSelector<PaymentHistoryTab>
          options={TAB_OPTIONS}
          selectedValue={activeTab}
          onSelect={setActiveTab}
        />
      </View>

      <AppFlashList<TalentPaymentHistoryItem>
        data={events}
        gap={8}
        renderItem={({ item }) => <PaymentHistoryCard event={item} />}
        keyExtractor={(item, index) => item.payout_id + index}
        contentContainerStyle={styles.contentContainer}
        emptyText={
          activeTab === 'pending' ? 'No pending payments' : 'No paid events yet'
        }
        skeleton={isLoading ? <PaymentSkeleton /> : undefined}
        showBottomLoader={!!hasNextPage}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        refreshing={isRefetchingQuery}
        onRefresh={refetchQuery}
      />
    </ScreenWrapper>
  );
};
