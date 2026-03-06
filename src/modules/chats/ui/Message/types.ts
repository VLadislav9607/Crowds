import { ChatType } from '@actions';

export interface IMessageData {
  id: string;
  isMe: boolean;
  text: string;
  time: string;
  showTime?: boolean;
  senderName: string;
  senderAvatar: string;
  senderRole: 'organization' | 'talent';
}

export interface IMessageProps {
  message: IMessageData;
  chatType: ChatType;
  isFirst?: boolean;
  isLast?: boolean;
}
