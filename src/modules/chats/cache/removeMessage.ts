import { InfiniteData } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { queryClient } from '@services';
import { GetChatMessagesResDto } from '@actions';

interface RemoveMessageParams {
  chatId: string;
  messageId: string;
  limit?: number;
}

export const removeMessage = ({
  chatId,
  messageId,
  limit = 50,
}: RemoveMessageParams) => {
  const queryKey = [
    TANSTACK_QUERY_KEYS.GET_CHAT_MESSAGES,
    JSON.stringify({ chatId, limit }),
  ];

  queryClient.setQueryData<InfiniteData<GetChatMessagesResDto>>(
    queryKey,
    existing => {
      if (!existing) return existing;

      const updatedPages = existing.pages.map(page => ({
        ...page,
        messages: page.messages.filter(msg => msg.id !== messageId),
      }));

      return {
        ...existing,
        pages: updatedPages,
      };
    },
  );
};

