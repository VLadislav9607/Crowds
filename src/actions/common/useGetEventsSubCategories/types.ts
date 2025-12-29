export type EventSubcategory = {
  id: string;
  category_id: string;
  title: string;
};

export interface UseGetEventsSubCategoriesResDto {
  subCategories: EventSubcategory[];
}
