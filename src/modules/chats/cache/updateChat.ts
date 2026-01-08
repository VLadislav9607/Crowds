import { TANSTACK_QUERY_KEYS } from '@constants';
import { queryClient } from '@services';
import { MyChatItem } from '@actions';

interface UpdateChatParams {
  chatId: string;
  lastMessage?: string;
  lastMessageAt?: string;
  hasUnread?: boolean;
}

export const updateChat = ({
  chatId,
  lastMessage,
  lastMessageAt,
  hasUnread = false,
}: UpdateChatParams) => {
  console.log('updateChat', chatId, lastMessage, lastMessageAt, hasUnread);
  const queryKey = [TANSTACK_QUERY_KEYS.MY_CHATS];

  queryClient.setQueryData<MyChatItem[]>(queryKey, existing => {
    if (!existing) return existing;

    return existing.map(chat =>
      chat.chatId === chatId
        ? {
            ...chat,
            lastMessage: lastMessage || chat.lastMessage,
            lastMessageAt: lastMessageAt || chat.lastMessageAt,
            hasUnread: hasUnread === undefined ? chat.hasUnread : hasUnread,
          }
        : chat,
    );
  });
};
