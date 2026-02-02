export type ChatMessage = {
  id: string;
  text: string;
  created_at: string;
  sender_id: string;
};

export interface GetChatMessagesBodyDto {
  chatId: string;
  limit?: number;
  cursor?: string | null;
}

export interface GetChatMessagesResponse {
  pages: ChatMessage[][];
  pageParams: (string | null)[];
}
