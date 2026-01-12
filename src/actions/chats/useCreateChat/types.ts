import { ChatType } from '@actions';

export interface CreateChatBodyDto {
  eventId: string;
  talentId: string;
  type: ChatType;
}

export interface CreateChatRespDto {
  chatId: string;
}
