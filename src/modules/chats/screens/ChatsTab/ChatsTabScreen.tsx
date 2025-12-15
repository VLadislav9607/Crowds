import { ScreenWrapper } from '@components';

import { ChatList } from '../../components';
import { IChatData } from '../../ui';

const MOCK_DATA: IChatData[] = [
  {
    id: '1',
    name: 'John Doe',
    time: '12:00',
    isUnread: true,
    eventName: 'Event 1',
    lastMessage: 'Hello, how are you?',
  },
  {
    id: '2',
    name: 'Jane Doe',
    time: '12:00',
    isUnread: false,
    eventName: 'Event 2',
    lastMessage: 'Hello, how are you?',
  },
  {
    id: '3',
    name: 'Jim Beam',
    time: '12:00',
    isUnread: false,
    eventName: 'Event 3',
    lastMessage: 'Hello, how are you?',
  },
  {
    id: '4',
    name: 'John Doe',
    time: '12:00',
    isUnread: true,
    eventName: 'Event 4',
    lastMessage: 'Hello, how are you?',
  },
  {
    id: '5',
    name: 'John Doe',
    time: '12:00',
    isUnread: false,
    eventName: 'Event 5',
    lastMessage: 'Hello, how are you?',
  },
];

export const ChatsTabScreen = () => {
  return (
    <ScreenWrapper headerVariant="withLogoAndImageBg" withBottomTabBar>
      <ChatList chats={MOCK_DATA} variant="organization" withBottomTab />
    </ScreenWrapper>
  );
};
