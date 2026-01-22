import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';

export interface FilterTalentsModalProps {
  bottomSheetRef: RefObject<BottomSheetModal<null> | null>;
  onApplyFilters?: (filters: FiltersState) => void;
  initialFilters?: FiltersState;
}

export interface FiltersState {
  distance?: { min: number; max: number };
  hairColour?: string;
  hairStyle?: string;
  eyeColour?: string;
  weight?: number;
  height?: number;
  facialAttributes?: string[];
  tattooSpot?: string[];
  skinTone?: string;
  isPregnant?: boolean;
  months?: string;
}
