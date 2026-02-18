import { StyleProp, ViewStyle } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { AddEventToForderModalData } from 'src/modules/events-folders';

export interface ITalentEventCard {
  participant?: {
    id: string;
    status: 'pending' | 'approved' | 'rejected';
    initiated_by: 'organization' | 'talent';
  } | null;
  location: {
    timezone?: string;
    city?: string;
    country?: string;
    formatted_address?: string;
  };
  event_id: string;
  brief: string;
  category_id: string;
  title: string;
  payment_amount: number;
  payment_mode: string;
  start_at: string;
  end_at: string;
  max_participations: number;
  created_at: string;
  can_reaccept?: boolean;
  is_in_any_folder?: boolean;
  office_country_code?: string | null;
}

export interface TalentEventCardProps {
  addEventToForderModalRef?: React.RefObject<BottomSheetModal<AddEventToForderModalData> | null>;
  event: ITalentEventCard;
  containerStyle?: StyleProp<ViewStyle>;
  hideRejectButton?: boolean;
  folderId?: string;
  onCancelApplication?: (participationId: string) => Promise<void>;
  onAccept?: (event: ITalentEventCard) => Promise<void>;
  onDecline?: (participationId: string) => Promise<void>;
  onApply?: (event: ITalentEventCard) => Promise<void>;
  onReject?: (eventId: string) => Promise<void>;
  onRemoveEventFromFolder?: (
    eventId: string,
    folderId: string,
  ) => Promise<void>;
}
