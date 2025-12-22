import { NotificationOption } from './types';

export const TALENT_NOTIFICATION_OPTIONS: NotificationOption[] = [
  { key: 'oneToOneChats', title: '1 on 1 chats' },
  {
    key: 'notificationsOfEventBefore24Hours',
    title: 'Notifications of Event before 24 Hours',
  },
  { key: 'groupMessages', title: 'Group messages' },
  { key: 'applicationAcceptance', title: 'Application acceptance' },
  { key: 'calendarItems', title: 'Calendar items' },
  { key: 'locationCheckInCheckOut', title: 'Location check in/check out' },
  { key: 'receivedFeedback', title: 'Received feedback' },
  { key: 'receivedPayment', title: 'Received payment' },
  {
    key: 'reminderMessages24hrs6hrs1hrs',
    title: 'Reminder messages 24hrs, 6 hrs, 1hrs',
  },
  { key: 'simpleMessages', title: 'Simple messages (hides all details)' },
  { key: 'locationChange', title: 'Location change' },
];

export const ORG_NOTIFICATION_OPTIONS: NotificationOption[] = [
  { key: 'oneToOneChats', title: '1 on 1 chats' },
  { key: 'groupMessages', title: 'Group messages' },
  { key: 'eventApplications', title: 'Event applications' },
  { key: 'calendarItems', title: 'Calendar items' },
  { key: 'locationCheckInCheckOut', title: 'Location check in/check out' },
  { key: 'receivedFeedback', title: 'Received feedback' },
  { key: 'receivedPayment', title: 'Received payment' },
  { key: 'simpleMessages', title: 'Simple messages (hides all details)' },
  { key: 'locationChange', title: 'Location change' },
];

export const TALENT_DEFAULT_SETTINGS = {
  oneToOneChats: true,
  notificationsOfEventBefore24Hours: true,
  groupMessages: false,
  applicationAcceptance: false,
  calendarItems: false,
  locationCheckInCheckOut: false,
  receivedFeedback: false,
  receivedPayment: false,
  reminderMessages24hrs6hrs1hrs: false,
  simpleMessages: false,
  locationChange: false,
};

export const ORG_DEFAULT_SETTINGS = {
  oneToOneChats: true,
  groupMessages: false,
  eventApplications: true,
  calendarItems: false,
  locationCheckInCheckOut: false,
  receivedFeedback: false,
  receivedPayment: false,
  simpleMessages: false,
  locationChange: false,
};
