import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';

export interface FilterTalentsModalProps {
  bottomSheetRef: RefObject<BottomSheetModal<null> | null>;
  onApplyFilters?: (filters: FiltersState | null) => void;
  initialFilters?: FiltersState | null;
  hideDistance?: boolean;
}

export interface FiltersState {
  distance?: number;
  hairColour?: string;
  hairStyle?: string;
  eyeColour?: string;
  weight?: { min: number; max: number };
  height?: { min: number; max: number };
  facialAttributes?: string[];
  tattooSpot?: string[];
  skinTone?: string;
  isPregnant?: boolean;
  months?: string;
}
