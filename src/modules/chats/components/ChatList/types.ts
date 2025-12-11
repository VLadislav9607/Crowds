import { IChatData, ChatVariant } from '../../ui';

export interface IChatListProps {
  chats: IChatData[];
  variant?: ChatVariant;
  onChatPress?: (chat: IChatData) => void;
  withBottomTab?: boolean;
  emptyText?: string;
}
