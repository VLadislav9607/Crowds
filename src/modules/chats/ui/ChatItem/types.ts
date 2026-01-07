import { MyChatItem } from '@actions';

export type ChatVariant = 'organization' | 'talent';

export interface IChatItemProps {
  chat: MyChatItem;
  variant?: ChatVariant;
  onPress?: () => void;
  isFirstChat?: boolean;
  isNextUnread?: boolean;
  isPrevUnread?: boolean;
}
