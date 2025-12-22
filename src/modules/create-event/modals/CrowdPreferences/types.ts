import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { CrowdPreferences } from '../../validation';

export interface CrowdPreferencesModalProps {
  bottomSheetRef: React.RefObject<BottomSheetModal | null>;
  preferences?: CrowdPreferences;
  onSave: (preferences: CrowdPreferences) => void;
}

