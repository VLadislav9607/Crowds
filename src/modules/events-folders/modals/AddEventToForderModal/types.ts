import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';

export interface AddEventToForderModalData {
  eventId: string;
  onChangeIsInAnyFolder?: (isInAnyFolder: boolean) => void;
}

export interface AddEventToForderModalProps {
  bottomSheetRef?: RefObject<BottomSheetModal<AddEventToForderModalData> | null>;
}
