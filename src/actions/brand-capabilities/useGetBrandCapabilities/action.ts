import { supabase, Tables } from '@services';
import { UseGetBrandCapabilitiesResDto } from './types';

export const getBrandCapabilitiesAction =
  async (): Promise<UseGetBrandCapabilitiesResDto> => {
    const { data, error } = await supabase.from('capabilities').select('*');
    if (error) throw error;

    const groupedCapabilities = data.reduce((acc, curr) => {
      acc[curr.capability_category] = acc[curr.capability_category] || [];
      acc[curr.capability_category].push(curr);
      return acc;
    }, {} as Record<string, Tables<'capabilities'>[]>);

    Object.keys(groupedCapabilities).forEach(category => {
      groupedCapabilities[category].sort((a, b) => a.sort_order - b.sort_order);
    });

    return {
      groupedCapabilities,
      capabilities: data,
    };
  };
