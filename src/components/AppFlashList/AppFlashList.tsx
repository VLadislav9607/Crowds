import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_TOTAL_HEIGHT } from '@navigation';
import { AppButton, AppText } from '@ui';
import { COLORS } from '@styles';

import { AppFlashListProps } from './types';

export const AppFlashList = <T,>({
  gap = 16,
  emptyText = 'No items found',
  withBottomTab = false,
  contentContainerStyle,
  data,
  floatingButtonProps,
  showBottomLoader = false,
  skeleton,
  ...props
}: AppFlashListProps<T>) => {
  const { bottom } = useSafeAreaInsets();

  const isEmpty = !data || data.length === 0;
  const bottomPadding = withBottomTab
    ? TAB_BAR_TOTAL_HEIGHT + (bottom || 16)
    : bottom || 16;

  const BottomLoaderComponent = (
    <View style={styles.bottomLoader}>
      <ActivityIndicator size="small" color={COLORS.black} />
    </View>
  );

  return (
    <>
      <FlashList
        data={data}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          bottomPadding > 0 && { paddingBottom: bottomPadding },
          contentContainerStyle,
        ]}
        ItemSeparatorComponent={() => ItemSeparator(gap)}
        ListEmptyComponent={
          skeleton || (
            <AppText
              renderIf={!showBottomLoader}
              typography="medium_14"
              color="gray"
              style={styles.emptyText}
            >
              {emptyText}
            </AppText>
          )
        }
        ListFooterComponent={
          showBottomLoader ? BottomLoaderComponent : undefined
        }
        {...props}
        scrollEnabled={
          !isEmpty || !!skeleton || !!props.scrollEnabled || !!props.onRefresh
        }
      />

      {!!floatingButtonProps && <AppButton {...floatingButtonProps} />}
    </>
  );
};

const ItemSeparator = (gap: number) => <View style={{ height: gap }} />;

const styles = StyleSheet.create({
  emptyText: {
    marginTop: '50%',
    textAlign: 'center',
  },
  bottomLoader: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
