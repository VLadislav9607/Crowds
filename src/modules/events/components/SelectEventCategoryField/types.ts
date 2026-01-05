import { BottomSheetFieldProps } from '@components';
import { Database } from '@services';

export interface SelectEventCategoryFieldProps {
  selectedCategoryId?: string;
  onChange: (
    data: Database['public']['Tables']['events_categories']['Row'],
  ) => void;
  fieldProps?: Partial<Omit<BottomSheetFieldProps, 'children'>>;
}
