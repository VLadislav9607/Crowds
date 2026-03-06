import { goToScreen, Screens } from '@navigation';
import { ChatType } from '../../actions/chats/useMyChats/types';

export function navigateFromNotification(
  type: string | undefined,
  data: Record<string, string> | undefined,
) {
  if (!type || !data) {
    goToScreen(Screens.Notifications);
    return;
  }

  switch (type) {
    case 'chat_message':
      if (data.chatId) {
        goToScreen(Screens.ChatRoom, {
          chatId: data.chatId,
          title: data.chatTitle ?? '',
          chatType: (data.chatType as ChatType) ?? ChatType.Direct,
          imageUrl: data.imageUrl ?? '',
        });
      } else {
        goToScreen(Screens.Notifications);
      }
      break;
    case 'task_rejected':
      if (data.eventId) {
        goToScreen(Screens.TalentEventDetails, { eventId: data.eventId });
      } else {
        goToScreen(Screens.Notifications);
      }
      break;
    default:
      goToScreen(Screens.Notifications);
      break;
  }
}
