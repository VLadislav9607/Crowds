import { NotificationOption } from './types';

export const TALENT_NOTIFICATION_OPTIONS: NotificationOption[] = [
  { key: 'oneToOneChats', title: '1 on 1 chats', enabled: true },
  { key: 'groupMessages', title: 'Group messages', enabled: true },
  { key: 'events', title: 'Events', enabled: true },
  { key: 'checkInCheckOut', title: 'Check in / Check out', enabled: true },
  { key: 'receivedPayment', title: 'Received payment', enabled: false },
];

export const ORG_NOTIFICATION_OPTIONS: NotificationOption[] = [
  { key: 'oneToOneChats', title: '1 on 1 chats', enabled: true },
  { key: 'groupMessages', title: 'Group messages', enabled: true },
  { key: 'events', title: 'Events', enabled: true },
  { key: 'checkInCheckOut', title: 'Check in / Check out', enabled: true },
  { key: 'receivedPayment', title: 'Received payment', enabled: false },
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
