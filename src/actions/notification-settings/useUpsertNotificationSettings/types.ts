export interface UpsertNotificationSettingsBodyDto {
  settings: Record<string, boolean>;
}

export interface UpsertNotificationSettingsResDto {
  user_id: string;
  settings: Record<string, boolean>;
  updated_at: string;
}
