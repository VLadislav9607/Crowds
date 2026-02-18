import { Enums } from '@services';

export interface EventLocationDto {
  autocomplete_description: string;
  city: string;
  coords?: string;
  country: string;
  formatted_address: string;
  latitude: number;
  longitude: number;
  place_id: string;
  postal_code?: string;
  region: string;
  street_name?: string;
  street_number?: string;
  timezone?: string; // Timezone ID from Google Maps API (e.g., 'America/New_York')
}

export interface CrowdPreferencesDto {
  ethnicity?: string[];
  accent?: string[];
  weight?: number;
  height?: number;
  eyeColour?: string[];
  hairColour?: string[];
  facialAttributes?: string[];
  bodyAttributes?: string[];
  tattooSpot?: string[];
  skinTone?: string[];
  isPregnant?: boolean;
  months?: number;
  additionalThings?: string[];
}

export interface AgeGroupDto {
  id: string;
  minAge: number;
  maxAge: number;
  maleCount?: number;
  femaleCount?: number;
  othersCount?: number;
  preferences?: CrowdPreferencesDto;
}

export interface CreatePublishedEventBodyDto {
  officeId: string;
  eventType: string;
  title: string;
  description: string;
  category: string;
  visibility: Enums<'EventVisibility'>;
  campaignStartAt?: string;
  campaignEndAt?: string;
  startAt: string;
  startTime?: string;
  endAt: string;
  endTime?: string;
  registrationClosingAt: string;
  payment_mode: Enums<'EventPaymentMode'>;
  payment_amount: number;
  eventBrief: string;
  ndaDocumentName?: string;
  ndaDocumentPath?: string;
  location?: EventLocationDto;
  ageGroups: AgeGroupDto[];
}

export interface CreatePublishedEventResDto {
  event_id: string;
}
