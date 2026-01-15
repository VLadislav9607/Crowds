import { StyleProp, ViewStyle } from 'react-native';
import { TalentEventStatus } from '../../../types';
import { ITalentEventCard } from '@actions';

export interface TalentEventCardCompactProps {
  event: ITalentEventCard;
  containerStyle?: StyleProp<ViewStyle>;
  type?: TalentEventStatus;
  isLoadingCancellation?: boolean;
  onCancelApplication?: (participationId: string) => void;
  onPressAccept?: (event: ITalentEventCard) => void;
  onPressDecline?: (participationId: string) => void;
  onPressApply?: (event: ITalentEventCard) => void;
}
