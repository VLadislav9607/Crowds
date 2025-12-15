import { FlashListProps } from '@shopify/flash-list';
import { StyleProp, ViewStyle } from 'react-native';

export interface AppFlashListProps<T>
  extends Omit<
    FlashListProps<T>,
    'ItemSeparatorComponent' | 'ListEmptyComponent'
  > {
  gap?: number;
  emptyText?: string;
  withBottomTab?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}
