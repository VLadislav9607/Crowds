import { TalentPublicEventsBodyDto } from '@actions';
import { FlashListProps } from '@shopify/flash-list';
import { StyleProp, TextStyle } from 'react-native';

export interface SearchEventsListProps
  extends Partial<Omit<FlashListProps<any>, 'data'>> {
  filters?: Omit<TalentPublicEventsBodyDto, 'limit' | 'offset'>;
  emptyTextStyle?: StyleProp<TextStyle>;
}
