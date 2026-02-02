import { ChatType } from '@actions';

export interface IMessageData {
  id: string;
  isMe: boolean;
  text: string;
  time: string;
  showTime?: boolean;
  senderName: string;
  senderAvatar: string;
}

export interface IMessageProps {
  message: IMessageData;
  isTalent: boolean;
  chatType: ChatType;
  isFirst?: boolean;
  isLast?: boolean;
}
