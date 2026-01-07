import { InfiniteData } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { queryClient } from '@services';
import { GetChatMessagesResDto, ChatMessage } from '@actions';

interface AddMessageParams {
  chatId: string;
  message: ChatMessage;
  limit?: number;
}

export const addMessage = ({
  chatId,
  message,
  limit = 50,
}: AddMessageParams) => {
  const queryKey = [
    TANSTACK_QUERY_KEYS.GET_CHAT_MESSAGES,
    JSON.stringify({ chatId, limit }),
  ];

  queryClient.setQueryData<InfiniteData<GetChatMessagesResDto>>(
    queryKey,
    existing => {
      if (!existing) return existing;

      // Check if message already exists
      const allMessages = existing.pages.flatMap(page => page.messages);
      const messageExists = allMessages.some(msg => msg.id === message.id);
      if (messageExists) return existing;

      const [firstPage, ...restPages] = existing.pages;
      const nextFirstPage = firstPage
        ? {
            ...firstPage,
            messages: [message, ...firstPage.messages],
          }
        : { messages: [message], nextCursor: null };

      return {
        ...existing,
        pages: [nextFirstPage, ...restPages],
      };
    },
  );
};
