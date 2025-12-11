import { ScreenWithScrollWrapper } from '@components';

import {
  MessageList,
  IMessageSection,
  SendMessageInput,
} from '../../components';

const SENDER_INFO = {
  name: 'John Doe',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};

const MOCK_SECTIONS: IMessageSection[] = [
  {
    title: 'Today',
    data: [
      {
        id: '1',
        text: 'Hello',
        time: '08:50 AM',
        sender: 'other',
        showTime: true,
        senderName: SENDER_INFO.name,
        senderAvatar: SENDER_INFO.avatar,
      },
      {
        id: '223',
        text: 'Can you tell me, will you supply costumes?',
        time: '08:50 AM',
        sender: 'other',
        senderName: SENDER_INFO.name,
        senderAvatar: SENDER_INFO.avatar,
      },
      {
        id: '2',
        text: 'Can you tell me, will you supply costumes?',
        time: '08:50 AM',
        sender: 'other',
        senderName: SENDER_INFO.name,
        senderAvatar: SENDER_INFO.avatar,
      },
      {
        id: '3',
        text: 'We will only supply branded t-shirts.',
        time: '08:01 AM',
        sender: 'me',
        showTime: true,
      },
      {
        id: '4',
        text: 'Ok, I was told something else.',
        time: '07:53 AM',
        sender: 'me',
        showTime: true,
        senderName: SENDER_INFO.name,
        senderAvatar: SENDER_INFO.avatar,
      },
      {
        id: '5',
        text: "I was under the impression you'd supply all.",
        time: '07:53 AM',
        sender: 'me',
        senderName: SENDER_INFO.name,
        senderAvatar: SENDER_INFO.avatar,
      },
      {
        id: '7',
        text: "Sorry, no this isn't the case.",
        time: '07:52 AM',
        sender: 'me',
        showTime: true,
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: '8',
        text: 'Hello, are you there?',
        time: '06:30 PM',
        sender: 'other',
        showTime: true,
        senderName: SENDER_INFO.name,
        senderAvatar: SENDER_INFO.avatar,
      },
      {
        id: '9',
        text: 'Yes, I am here.',
        time: '06:35 PM',
        sender: 'me',
        showTime: true,
      },
    ],
  },
  {
    title: 'Last week',
    data: [
      {
        id: '10',
        text: 'Hello, are you there?',
        time: '06:30 PM',
        sender: 'other',
        showTime: true,
        senderName: SENDER_INFO.name,
        senderAvatar: SENDER_INFO.avatar,
      },
      {
        id: '11',
        text: 'Yes, I am here.',
        time: '06:35 PM',
        sender: 'me',
        showTime: true,
      },
    ],
  },
];

export const ChatRoomScreen = () => {
  return (
    <ScreenWithScrollWrapper
      headerVariant="withTitleAndImageBg"
      title="Christopher Nolan"
      avatarUrl="https://randomuser.me/api/portraits/men/32.jpg"
      withBottomTabBar
      footer={<SendMessageInput />}
      footerStyle={{ paddingBottom: 0 }}
    >
      <MessageList sections={MOCK_SECTIONS} />
    </ScreenWithScrollWrapper>
  );
};
