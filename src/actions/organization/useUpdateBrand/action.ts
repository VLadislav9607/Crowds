import { supabase } from '@services';
import { UpdateBrandBodyDto, UpdateBrandRespDto } from './types';

export const udateBrandAction = async (
  body: UpdateBrandBodyDto,
): Promise<UpdateBrandRespDto> => {
  const { data, error } = await supabase.rpc('update_brand', {
    p_brand_id: body.brand_id,
    p_brand_name: body.brand_name,
    p_logo_path: body.logo_path ?? undefined,
  });

  if (error) throw error;

  return { brand: data } as unknown as UpdateBrandRespDto;
};
