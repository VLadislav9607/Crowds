import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';

export interface FilterMatchingTalentsModalProps {
  bottomSheetRef: RefObject<BottomSheetModal<null> | null>;
  onApplyFilters?: (filters: FilterMatchingTalentsState) => void;
  initialFilters?: FilterMatchingTalentsState;
}

export interface FilterMatchingTalentsState {
  distance: number;
}
