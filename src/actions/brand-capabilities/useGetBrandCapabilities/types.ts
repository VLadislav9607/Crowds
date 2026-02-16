import { Enums, Tables } from '@services';

export interface UseGetBrandCapabilitiesResDto {
  groupedCapabilities: Record<
    Enums<'СapabilityСategory'>,
    Tables<'capabilities'>[]
  >;
  capabilities: Tables<'capabilities'>[];
}
