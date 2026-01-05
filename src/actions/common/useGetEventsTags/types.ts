export type EventTag = {
  id: string;
  subcategory_id: string;
  title: string;
};

export interface UseGetEventsTagsResDto {
  tags: EventTag[];
}
