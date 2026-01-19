import { StyleProp, ViewStyle } from 'react-native';
import { TalentEventsTabs } from '../../../types';
import { ITalentEventCard } from '@actions';

export interface TalentEventCardProps {
  event: ITalentEventCard;
  containerStyle?: StyleProp<ViewStyle>;
  type?: TalentEventsTabs | 'random';
  isLoadingCancellation?: boolean;
  isLoadingAccept?: boolean;
  isLoadingDecline?: boolean;
  isLoadingApply?: boolean;
  isLoadingReject?: boolean;
  onCancelApplication?: (participationId: string) => void;
  onPressAccept?: (event: ITalentEventCard) => void;
  onPressDecline?: (participationId: string) => void;
  onPressApply?: (event: ITalentEventCard) => void;
  onPressReject?: (eventId: string) => void;
}
