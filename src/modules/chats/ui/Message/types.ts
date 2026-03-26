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
  isEdited?: boolean;
}

export interface IMessageProps {
  message: IMessageData;
  chatType: ChatType;
  isFirst?: boolean;
  isLast?: boolean;
  onLongPress?: (message: IMessageData) => void;
}
