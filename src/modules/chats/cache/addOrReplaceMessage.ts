import { InfiniteData } from '@tanstack/react-query';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { queryClient } from '@services';
import { ChatMessage } from '@actions';

interface AddOrReplaceMessageParams {
  chatId: string;
  message: ChatMessage;
  limit?: number;
}

export const addOrReplaceMessage = ({
  chatId,
  message,
  limit = 50,
}: AddOrReplaceMessageParams) => {
  const queryKey = [
    TANSTACK_QUERY_KEYS.GET_CHAT_MESSAGES,
    JSON.stringify({ chatId, limit }),
  ];

  queryClient.setQueryData<InfiniteData<ChatMessage[]>>(queryKey, existing => {
    if (!existing) return existing;

    // Check if message already exists (by ID) - this prevents duplicates
    const allMessages = existing.pages.flatMap(page => page);
    const existingMessage = allMessages.find(msg => msg.id === message.id);
    if (existingMessage) {
      // Message already exists, don't add duplicate
      return existing;
    }

    // Check if there's a temporary message with the same text that should be replaced
    // We match by text only since sender_id differs between temp (me.id) and real (chat_identity.id)
    // Also check that temp message was created recently (within last 30 seconds) to avoid replacing old temp messages
    const now = Date.now();
    const tempMessages = allMessages.filter(msg => msg.id.startsWith('temp-'));
    const tempMessage = tempMessages.find(msg => {
      if (msg.text !== message.text) return false;
      // Check if temp message is from current user (sender_id should match)
      if (msg.sender_id !== message.sender_id) return false;

      // Check if temp message was created recently (extract timestamp from temp ID)
      const tempTimestamp = parseInt(msg.id.split('-')[1], 10);
      if (isNaN(tempTimestamp)) return true; // If can't parse, allow replacement
      const timeDiff = now - tempTimestamp;
      return timeDiff < 30000; // Only replace if temp message is less than 30 seconds old
    });

    if (tempMessage) {
      // Replace temporary message
      const updatedPages = existing.pages.map(page =>
        page.map(msg => (msg.id === tempMessage.id ? message : msg)),
      );

      return {
        ...existing,
        pages: updatedPages,
      };
    }

    // Add new message to the first page
    const [firstPage, ...restPages] = existing.pages;
    const nextFirstPage = firstPage ? [message, ...firstPage] : [message];

    return {
      ...existing,
      pages: [nextFirstPage, ...restPages],
    };
  });
};
