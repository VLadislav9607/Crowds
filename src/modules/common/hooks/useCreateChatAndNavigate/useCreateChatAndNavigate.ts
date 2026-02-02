import { useRef } from 'react';
import { useCreateChat, ChatType } from '@actions';
import { goToScreen, Screens } from '@navigation';
import { showMutationErrorToast } from '@helpers';

import type { CreateChatAndNavigateParams } from './types';

export const useCreateChatAndNavigate = () => {
  const pendingChatRef = useRef<Pick<CreateChatAndNavigateParams, 'title' | 'imageUrl'> | null>(null);

  const { mutate: createChat, isPending } = useCreateChat({
    onSuccess: data => {
      const pending = pendingChatRef.current;
      goToScreen(Screens.ChatRoom, {
        chatType: ChatType.Direct,
        chatId: data.chatId,
        title: pending?.title ?? '',
        imageUrl: pending?.imageUrl ?? '',
      });
      pendingChatRef.current = null;
    },
    onError: showMutationErrorToast,
  });

  const openChat = (params: CreateChatAndNavigateParams) => {
    pendingChatRef.current = { title: params.title, imageUrl: params.imageUrl };
    createChat({ eventId: params.eventId, talentId: params.talentId });
  };

  return { openChat, isPending };
};
