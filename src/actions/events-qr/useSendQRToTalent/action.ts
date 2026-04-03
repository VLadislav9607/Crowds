import { createChatAction } from '../../chats/useCreateChat/action';
import { sendMessageAction } from '../../chats/useSendMessage/action';
import { updateLastSeenChatAction } from '../../chats/updateLastSeenChat/action';
import { SendQRToTalentBodyDto, SendQRToTalentRespDto } from './types';

export const sendQRToTalentAction = async (
  body: SendQRToTalentBodyDto,
): Promise<SendQRToTalentRespDto> => {
  const { chatId } = await createChatAction({
    eventId: body.eventId,
    talentId: body.talentId,
  });

  await sendMessageAction({
    chatId,
    text: `QR Code: ${body.qrCodeName}`,
    imagePath: body.qrPath,
    imageBucket: 'event_qr',
  });

  await updateLastSeenChatAction(chatId);

  return { chatId };
};
