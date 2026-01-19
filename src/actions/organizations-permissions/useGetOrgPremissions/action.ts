import { supabase, Tables } from '@services';
import { UseGetOrgPremissionsResDto } from './types';

export const getOrgPermissionsAction =
  async (): Promise<UseGetOrgPremissionsResDto> => {
    const { data, error } = await supabase
      .from('organization_permissions')
      .select('*');
    if (error) throw error;

    const groupedPermissions = data.reduce((acc, curr) => {
      acc[curr.category] = acc[curr.category] || [];
      acc[curr.category].push(curr);
      return acc;
    }, {} as Record<string, Tables<'organization_permissions'>[]>);

    // Сортуємо всередині кожної категорії по sort_order від меншого до більшого
    Object.keys(groupedPermissions).forEach(category => {
      groupedPermissions[category].sort((a, b) => a.sort_order - b.sort_order);
    });

    return {
      groupedPermissions,
      permissions: data,
    };
  };
