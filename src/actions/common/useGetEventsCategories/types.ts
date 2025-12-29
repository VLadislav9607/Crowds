export type EventCategory = {
  id: string;
  title: string;
};

export interface UseGetEventsCategoriesResDto {
  categories: EventCategory[];
}
