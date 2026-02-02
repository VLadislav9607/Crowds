export interface SendMessageBodyDto {
  chatId: string;
  text: string;
}

export interface SendMessageRespDto {
  chat_id: string;
  created_at: string;
  id: string;
  sender_id: string;
  text: string;
}
