export type ChatVariant = 'organization' | 'talent';

export interface IChatData {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  isUnread?: boolean;
  eventName?: string; // only for organization variant
}

export interface IChatItemProps {
  chat: IChatData;
  variant?: ChatVariant;
  onPress?: () => void;
  isFirstChat?: boolean;
  isNextUnread?: boolean;
  isPrevUnread?: boolean;
}

