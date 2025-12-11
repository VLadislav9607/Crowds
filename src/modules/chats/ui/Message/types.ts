export type MessageSender = 'me' | 'other';

export interface IMessageData {
  id: string;
  text: string;
  time: string;
  sender: MessageSender;
  showTime?: boolean;
  senderName?: string;
  senderAvatar?: string;
}

export interface IMessageProps {
  message: IMessageData;
  isFirst?: boolean;
  isLast?: boolean;
}

