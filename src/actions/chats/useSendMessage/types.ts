export interface SendMessageBodyDto {
  chatId: string;
  text?: string;
  imagePath?: string;
  imageBucket?: string;
}

export interface SendMessageRespDto {
  chat_id: string;
  created_at: string;
  id: string;
  sender_id: string;
  text: string;
  image_path?: string | null;
  image_bucket?: string | null;
}
