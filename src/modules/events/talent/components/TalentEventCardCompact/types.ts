import { StyleProp, ViewStyle } from 'react-native';
import { TalentEventStatus } from '../../../types';
import { SearchPublicEventsListItemDto } from '@actions';

export interface TalentEventCardCompactProps {
  event: SearchPublicEventsListItemDto;
  containerStyle?: StyleProp<ViewStyle>;
  type?: TalentEventStatus;
}
