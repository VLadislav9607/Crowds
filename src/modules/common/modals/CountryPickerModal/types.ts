import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ICountryWithFlag } from '@constants';
import { RefObject } from 'react';

export interface CountryPickerModalData {
  onCountryPicked?: (country: ICountryWithFlag) => void;
  onCountriesPicked?: (countries: ICountryWithFlag[]) => void;
  multiple?: boolean;
  // selectedCodesDefault: {code: string, marker?: React.ReactNode}[],
  selectedCodesDefault?: string[];
  selectedCodesForever?: string[];
  disabledCodes?: string[];
  selectedCountryMarkers?: {
    code: string;
    marker: React.ReactNode;
  }[];
  selectedMarkerElement?: React.ReactNode;
  title?: string;
}

export interface CountryPickerModalProps {
  bottomSheetRef?: RefObject<BottomSheetModal<CountryPickerModalData> | null>;
}
