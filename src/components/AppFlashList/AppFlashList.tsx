import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TAB_BAR_TOTAL_HEIGHT } from '@navigation';

import { AppFlashListProps } from './types';
import { AppText } from '@ui';

export const AppFlashList = <T,>({
  gap = 16,
  emptyText = 'No items found',
  withBottomTab = false,
  contentContainerStyle,
  data,
  ...props
}: AppFlashListProps<T>) => {
  const { bottom } = useSafeAreaInsets();

  const isEmpty = !data || data.length === 0;
  const bottomPadding = withBottomTab ? TAB_BAR_TOTAL_HEIGHT + bottom : 0;

  return (
    <FlashList
      data={data}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        isEmpty ? styles.centerContent : undefined,
        bottomPadding > 0 && { paddingBottom: bottomPadding },
        contentContainerStyle,
      ]}
      ItemSeparatorComponent={() => ItemSeparator(gap)}
      ListEmptyComponent={
        <AppText typography="medium_14" color="gray" style={styles.emptyText}>
          {emptyText}
        </AppText>
      }
      {...props}
    />
  );
};

const ItemSeparator = (gap: number) => <View style={{ height: gap }} />;

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
  },
});
