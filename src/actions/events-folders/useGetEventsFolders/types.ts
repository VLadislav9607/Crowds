export interface EventFolder {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  events_count: number;
  has_event: boolean | null;
}

export interface UseGetEventsFoldersBodyDto {
  event_id?: string;
}
