import { StyleProp, ViewStyle } from 'react-native';
import { TalentEventStatus } from '../../../types';
import { ITalentEvent } from '@actions';

export interface TalentEventCardCompactProps {
  event: ITalentEvent;
  containerStyle?: StyleProp<ViewStyle>;
  type?: TalentEventStatus;
  onPressAccept?: (participationId: string) => void;
  onPressDecline?: (participationId: string) => void;
}
