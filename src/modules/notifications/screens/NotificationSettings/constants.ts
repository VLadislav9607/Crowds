import { NotificationOption } from './types';

export const TALENT_NOTIFICATION_OPTIONS: NotificationOption[] = [
  { key: 'oneToOneChats', title: '1 on 1 chats', enabled: true },
  {
    key: 'notificationsOfEventBefore24Hours',
    title: 'Notifications of Event before 24 Hours',
    enabled: true,
  },
  { key: 'groupMessages', title: 'Group messages', enabled: true },
  { key: 'applicationAcceptance', title: 'Application acceptance', enabled: true },
  { key: 'calendarItems', title: 'Calendar items', enabled: false },
  { key: 'locationCheckInCheckOut', title: 'Location check in/check out', enabled: false },
  { key: 'receivedFeedback', title: 'Received feedback', enabled: false },
  { key: 'receivedPayment', title: 'Received payment', enabled: false },
  {
    key: 'reminderMessages24hrs6hrs1hrs',
    title: 'Reminder messages 24hrs, 6 hrs, 1hrs',
    enabled: false,
  },
  { key: 'simpleMessages', title: 'Simple messages (hides all details)', enabled: false },
  { key: 'locationChange', title: 'Location change', enabled: false },
];

export const ORG_NOTIFICATION_OPTIONS: NotificationOption[] = [
  { key: 'oneToOneChats', title: '1 on 1 chats', enabled: true },
  { key: 'groupMessages', title: 'Group messages', enabled: true },
  { key: 'eventApplications', title: 'Event applications', enabled: true },
  { key: 'calendarItems', title: 'Calendar items', enabled: false },
  { key: 'locationCheckInCheckOut', title: 'Location check in/check out', enabled: false },
  { key: 'receivedFeedback', title: 'Received feedback', enabled: false },
  { key: 'receivedPayment', title: 'Received payment', enabled: false },
  { key: 'simpleMessages', title: 'Simple messages (hides all details)', enabled: false },
  { key: 'locationChange', title: 'Location change', enabled: false },
];

export const TALENT_DEFAULT_SETTINGS: Record<string, boolean> = {
  oneToOneChats: true,
  notificationsOfEventBefore24Hours: true,
  groupMessages: true,
  applicationAcceptance: true,
};

export const ORG_DEFAULT_SETTINGS: Record<string, boolean> = {
  oneToOneChats: true,
  groupMessages: true,
  eventApplications: true,
};
