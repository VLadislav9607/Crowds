import { ICONS } from '@assets';

export const getEventIcon = (categoryId: string) => {
  switch (categoryId) {
    // TV
    case '0da571fa-80a1-4662-89c1-895731b980cf':
      return ICONS.EVENT_CATEGORIES.music;

    // Film Extras
    case '197a79a7-13d2-4916-b082-91df4906fe7b':
      return ICONS.EVENT_CATEGORIES.filmExtras;

    // Politics
    case '3d67b37e-6fdd-4e2d-a491-ee1143e81e32':
      return ICONS.EVENT_CATEGORIES.tv;

    // Retail
    case '507c1313-d176-4a04-b290-c3a202fa7da6':
      return ICONS.EVENT_CATEGORIES.retails;

    // PR Groups
    case '6fd13a64-d5ac-4c6b-8337-e7644dadf387':
      return ICONS.EVENT_CATEGORIES.prGroups;

    // Private Events
    case '7d0facb7-0f99-4c2b-a5e2-d9e7ab718a7b':
      return ICONS.EVENT_CATEGORIES.privateEvents;

    // Music
    case '87175ee6-b9f6-4cb4-be66-3e5f3f11b956':
      return ICONS.EVENT_CATEGORIES.music;

    // Hospitality
    case '9d57c726-3cce-4c19-b508-50c190cccea4':
      return ICONS.EVENT_CATEGORIES.hospitality;

    // Default
    default:
      return ICONS.calendarEvent;
  }
};
