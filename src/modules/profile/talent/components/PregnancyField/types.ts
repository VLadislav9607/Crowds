import { ViewStyle } from 'react-native';

export interface PregnancyFieldProps {
  months?: string;
  errorMessage?: string;
  containerStyle?: ViewStyle;
  isPregnant?: boolean;
  setIsPregnant?: (isPregnant: boolean) => void;
  setMonths?: (months: string) => void;
}
