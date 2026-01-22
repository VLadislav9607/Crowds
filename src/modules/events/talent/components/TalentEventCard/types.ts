import { StyleProp, ViewStyle } from 'react-native';
import { TalentEventsTabs } from '../../../types';
import { ITalentEventCard } from '@actions';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AddEventToForderModalData } from 'src/modules/events-folders';

export interface TalentEventCardProps {
  addEventToForderModalRef?: React.RefObject<BottomSheetModal<AddEventToForderModalData> | null>;
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
