import { Database } from '@services';

export interface UseGetEventsCategoriesResDto {
  categories: Database['public']['Tables']['events_categories']['Row'][];
}
