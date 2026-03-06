export enum ChatType {
  Direct = 'direct',
  Group = 'group',
}

export interface MyChatItem {
  chatId: string;
  type: ChatType;

  title: string;
  eventName?: string | null;
  avatarUrl?: string | null;
  avatarBucket?: 'brand_avatars' | 'talents_avatars';

  lastMessage?: string | null;
  lastMessageAt?: string | null;

  hasUnread: boolean;
}
