import { RefObject } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export interface QRCodeActionsModalData {
  qrCodeName: string;
  qrCodeId: string;
  eventId: string;
}

export interface QRCodeActionsModalProps {
  bottomSheetRef?: RefObject<BottomSheetModal<QRCodeActionsModalData> | null>;
}
