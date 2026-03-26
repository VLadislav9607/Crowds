export const TALENT_NOTIFICATION_OPTIONS = [
  { key: 'oneToOneChats', title: '1 on 1 chats' },
  { key: 'groupMessages', title: 'Group messages' },
  { key: 'events', title: 'Events' },
  { key: 'checkInCheckOut', title: 'Check in / Check out' },
];

export const ORG_NOTIFICATION_OPTIONS = [
  { key: 'oneToOneChats', title: '1 on 1 chats' },
  { key: 'groupMessages', title: 'Group messages' },
  { key: 'events', title: 'Events' },
  { key: 'checkInCheckOut', title: 'Check in / Check out' },
];

export const TALENT_DEFAULT_SETTINGS: Record<string, boolean> = {
  oneToOneChats: true,
  groupMessages: true,
  events: true,
  checkInCheckOut: true,
};

export const ORG_DEFAULT_SETTINGS: Record<string, boolean> = {
  oneToOneChats: true,
  groupMessages: true,
  events: true,
  checkInCheckOut: true,
};
