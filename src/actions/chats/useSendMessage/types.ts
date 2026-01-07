import { ChatMessage } from '../useGetChatMessages';

export interface SendMessageBodyDto {
  chatId: string;
  text: string;
}

export interface SendMessageRespDto {
  message: ChatMessage;
}
