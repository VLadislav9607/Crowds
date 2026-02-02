import { RefObject } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export interface EventsFolderActionsModalData {
  folderId: string;
  folderName: string;
}

export interface EventsFolderActionsModalProps {
  bottomSheetRef?: RefObject<BottomSheetModal<EventsFolderActionsModalData> | null>;
}
