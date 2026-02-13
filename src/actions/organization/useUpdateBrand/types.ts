import { Database } from '@services';

export interface UpdateBrandBodyDto {
  brand_id: string;
  brand_name?: string;
  logo_path?: string | null;
}

export interface UpdateBrandRespDto {
  brand: Database['public']['Tables']['brands']['Row'];
}
