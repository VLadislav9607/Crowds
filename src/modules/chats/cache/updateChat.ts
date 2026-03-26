import { TANSTACK_QUERY_KEYS } from '@constants';
import { queryClient } from '@services';
import { MyChatItem } from '@actions';

interface UpdateChatParams {
  chatId: string;
  lastMessage?: string | null;
  lastMessageAt?: string | null;
  hasUnread?: boolean;
}

export const updateChat = ({
  chatId,
  lastMessage,
  lastMessageAt,
  hasUnread,
}: UpdateChatParams) => {
  const queryKey = [TANSTACK_QUERY_KEYS.MY_CHATS];

  const existing = queryClient.getQueryData<MyChatItem[]>(queryKey);

  const chatExists = existing?.some(chat => chat.chatId === chatId);

  if (!chatExists) {
    queryClient.refetchQueries({ queryKey });
    return;
  }

  queryClient.setQueryData<MyChatItem[]>(queryKey, prev => {
    if (!prev) return prev;

    return prev.map(chat =>
      chat.chatId === chatId
        ? {
            ...chat,
            lastMessage: lastMessage !== undefined ? lastMessage : chat.lastMessage,
            lastMessageAt: lastMessageAt !== undefined ? lastMessageAt : chat.lastMessageAt,
            hasUnread: hasUnread === undefined ? chat.hasUnread : hasUnread,
          }
        : chat,
    );
  });
};
