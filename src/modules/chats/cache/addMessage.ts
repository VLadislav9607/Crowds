import { InfiniteData } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { queryClient } from '@services';
import { ChatMessage } from '@actions';

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

  queryClient.setQueryData<InfiniteData<ChatMessage[]>>(queryKey, existing => {
    if (!existing) return existing;

    // Check if message already exists
    const allMessages = existing.pages.flatMap(page => page);
    const messageExists = allMessages.some(msg => msg.id === message.id);
    if (messageExists) return existing;

    // Add new message to the first page
    const [firstPage, ...restPages] = existing.pages;
    const nextFirstPage = firstPage ? [message, ...firstPage] : [message];

    return {
      ...existing,
      pages: [nextFirstPage, ...restPages],
    };
  });
};
