import { Tables } from '@services';

export interface UseGetEventByOrgMemberBodyDto {
  event_id: string;
}

export interface EventPreferenceDto {
  weight_min: number | null;
  weight_max: number | null;
  height_min: number | null;
  height_max: number | null;
  pregnancy_allowed: boolean | null;
  pregnancy_months: number | null;
  additional_notes: string | null;
  ethnicities: Tables<'event_preference_ethnicities'>[] | null;
  accents: Tables<'event_preference_accents'>[] | null;
  eye_colors: Tables<'event_preference_eye_colors'>[] | null;
  hair_colors: Tables<'event_preference_hair_colors'>[] | null;
  facial_attributes: Tables<'event_preference_facial_attributes'>[] | null;
  body_attributes: Tables<'event_preference_body_attributes'>[] | null;
  tattoo_spots: Tables<'event_preference_tattoo_spots'>[] | null;
  skin_tones: Tables<'event_preference_skin_tones'>[] | null;
}

export interface EventAgeGroupDto
  extends Omit<Tables<'event_age_groups'>, 'created_at'> {
  preferences?: EventPreferenceDto;
}

export interface EventForOrgMemberDto
  extends Omit<Tables<'events'>, 'created_at' | 'creator_id' | 'deleted_at'> {
  event_location: Omit<Tables<'event_locations'>, 'created_at'>;
  event_age_groups: EventAgeGroupDto[];
  qr_codes_count: number;
}
