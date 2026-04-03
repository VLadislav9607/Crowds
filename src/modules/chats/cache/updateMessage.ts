import { InfiniteData } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { queryClient } from '@services';
import { ChatMessage } from '@actions';

interface UpdateMessageParams {
  chatId: string;
  messageId: string;
  updates: Partial<Pick<ChatMessage, 'text' | 'is_edited'>>;
  limit?: number;
}

export const updateMessage = ({
  chatId,
  messageId,
  updates,
  limit = 50,
}: UpdateMessageParams) => {
  const queryKey = [
    TANSTACK_QUERY_KEYS.GET_CHAT_MESSAGES,
    JSON.stringify({ chatId, limit }),
  ];

  queryClient.setQueryData<InfiniteData<ChatMessage[]>>(queryKey, existing => {
    if (!existing) return existing;

    const updatedPages = existing.pages.map(page =>
      page.map(msg =>
        msg.id === messageId ? { ...msg, ...updates } : msg,
      ),
    );

    return {
      ...existing,
      pages: updatedPages,
    };
  });
};
