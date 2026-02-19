import { Database } from '@services/supabase/types';

export type NotificationItem =
  Database['public']['Tables']['notifications']['Row'];

export interface GetNotificationsResDto {
  notifications: NotificationItem[];
}
