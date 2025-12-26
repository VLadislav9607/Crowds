import { Category } from './category.enums';

export const Tag = {
  // Hospitality
  BARTENDER: 'bartender',
  WAITER: 'waiter',
  HOST: 'host',
  BARISTA: 'barista',
  SOMMELIER: 'sommelier',
  CHEF: 'chef',

  // Retail
  CASHIER: 'cashier',
  SALES_ASSISTANT: 'sales_assistant',
  MERCHANDISER: 'merchandiser',
  STOCK_HANDLER: 'stock_handler',
  VISUAL_MERCHANDISER: 'visual_merchandiser',

  // PR Groups
  BRAND_AMBASSADOR: 'brand_ambassador',
  PROMOTER: 'promoter',
  EVENT_HOST: 'event_host',
  STREET_TEAM: 'street_team',

  // Private Events
  CATERING_STAFF: 'catering_staff',
  PARTY_HOST: 'party_host',
  BUTLER: 'butler',
  COAT_CHECK: 'coat_check',

  // Music Groups
  BACKING_DANCER: 'backing_dancer',
  STAGE_HAND: 'stage_hand',
  ROADIE: 'roadie',
  CROWD_EXTRA: 'crowd_extra',

  // Politics
  CAMPAIGN_WORKER: 'campaign_worker',
  CANVASSER: 'canvasser',
  EVENT_SUPPORT: 'event_support',

  // TV (Ad Hoc)
  AUDIENCE_MEMBER: 'audience_member',
  STAND_IN: 'stand_in',
  BACKGROUND_EXTRA: 'background_extra',
  BODY_DOUBLE: 'body_double',

  // Film Extra
  FEATURED_EXTRA: 'featured_extra',
  GENERAL_EXTRA: 'general_extra',
  PHOTO_DOUBLE: 'photo_double',
  SPECIALTY_EXTRA: 'specialty_extra',
} as const;

export type TagValue = (typeof Tag)[keyof typeof Tag];

export const CATEGORY_TAGS: Record<Category, TagValue[]> = {
  [Category.HOSPITALITY]: [
    Tag.BARTENDER,
    Tag.WAITER,
    Tag.HOST,
    Tag.BARISTA,
    Tag.SOMMELIER,
    Tag.CHEF,
  ],
  [Category.RETAIL]: [
    Tag.CASHIER,
    Tag.SALES_ASSISTANT,
    Tag.MERCHANDISER,
    Tag.STOCK_HANDLER,
    Tag.VISUAL_MERCHANDISER,
  ],
  [Category.PR_GROUPS]: [
    Tag.BRAND_AMBASSADOR,
    Tag.PROMOTER,
    Tag.EVENT_HOST,
    Tag.STREET_TEAM,
  ],
  [Category.PRIVATE_EVENTS]: [
    Tag.CATERING_STAFF,
    Tag.PARTY_HOST,
    Tag.BUTLER,
    Tag.COAT_CHECK,
  ],
  [Category.MUSIC_GROUPS]: [
    Tag.BACKING_DANCER,
    Tag.STAGE_HAND,
    Tag.ROADIE,
    Tag.CROWD_EXTRA,
  ],
  [Category.POLITICS]: [Tag.CAMPAIGN_WORKER, Tag.CANVASSER, Tag.EVENT_SUPPORT],
  [Category.TV_AD_HOC]: [
    Tag.AUDIENCE_MEMBER,
    Tag.STAND_IN,
    Tag.BACKGROUND_EXTRA,
    Tag.BODY_DOUBLE,
  ],
  [Category.FILM_EXTRA]: [
    Tag.FEATURED_EXTRA,
    Tag.GENERAL_EXTRA,
    Tag.PHOTO_DOUBLE,
    Tag.SPECIALTY_EXTRA,
  ],
};
