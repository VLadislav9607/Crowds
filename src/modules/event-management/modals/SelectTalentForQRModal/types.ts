import { RefObject } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export interface SelectTalentForQRModalData {
  eventId: string;
  qrPath: string;
  qrCodeName: string;
  groupChatId?: string | null;
}

export interface SelectTalentForQRModalProps {
  bottomSheetRef?: RefObject<BottomSheetModal<SelectTalentForQRModalData> | null>;
}
