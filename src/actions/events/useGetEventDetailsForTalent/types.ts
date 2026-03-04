import { Tables } from '@services';
import { EventAgeGroupDto } from '../useGetEventForOrgMember/types';

export interface UseGetEventDetailsForTalentBodyDto {
  event_id: string;
}

export interface EventDetailsForTalentDto {
  id: string;
  title: string;
  brief: string | null;
  category_id: string;
  event_type: string | null;
  start_at: string;
  end_at: string;
  registration_closes_at: string | null;
  visibility: string;
  payment_mode: string;
  payment_amount: number;
  nda_file_name: string | null;
  nda_file_path: string | null;
  description: string | null;
  office_id: string;
  office_country_code: string | null;
  brand_logo_path: string | null;
  event_location: Omit<Tables<'event_locations'>, 'created_at'> | null;
  event_age_groups: EventAgeGroupDto[];
  participation_id: string | null;
  checked_out_at: string | null;
  task_status: string;
  task_photo_path: string | null;
}
