import { MyChatItem } from '@actions';
import { ChatVariant } from '../../ui';

export interface IChatListProps {
  chats: MyChatItem[];
  isLoading?: boolean;
  variant?: ChatVariant;
  withBottomTab?: boolean;
  emptyText?: string;
}
