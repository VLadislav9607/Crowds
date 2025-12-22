import { StyleProp, ViewStyle } from 'react-native';
import { FlashListProps } from '@shopify/flash-list';
import { ButtonProps } from '@ui';

export interface AppFlashListProps<T>
  extends Omit<
    FlashListProps<T>,
    'ItemSeparatorComponent' | 'ListEmptyComponent'
  > {
  gap?: number;
  emptyText?: string;
  withBottomTab?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  floatingButtonProps?: ButtonProps;
}
