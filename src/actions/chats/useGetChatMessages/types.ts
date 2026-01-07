export type ChatMessage = {
  id: string;
  text: string;
  created_at: string;
  sender_identity_id: string;
  is_mine: boolean;
};

export interface GetChatMessagesBodyDto {
  chatId: string;
  limit?: number;
  cursor?: string | null;
}

export interface GetChatMessagesResDto {
  messages: ChatMessage[];
  nextCursor: string | null;
}
