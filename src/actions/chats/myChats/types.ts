export enum ChatType {
  Direct = 'direct',
  Group = 'group',
}

export interface MyChatItem {
  chatId: string;
  type: ChatType;

  title: string;
  subtitle?: string | null;
  avatarUrl?: string | null;

  lastMessage?: string | null;
  lastMessageAt?: string | null;

  hasUnread: boolean;
}
