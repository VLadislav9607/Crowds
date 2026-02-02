import { useCallback, useEffect, useMemo } from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { goBack, Screens, useScreenNavigation } from '@navigation';
import {
  ChatMessage,
  useGetMe,
  updateLastSeenChatAction,
  useChatParticipants,
  useGetChatMessages,
} from '@actions';

import { useChatMessagesRealtime } from '../../hooks';
import { buildMessageSections } from '../../helpers';
import { chatsCache } from '../../cache';

export const useChatRoomScreen = () => {
  const { params } = useScreenNavigation<Screens.ChatRoom>();
  const { me, isTalent } = useGetMe();

  const chatId = params?.chatId ?? '';

  useChatMessagesRealtime({
    chatId,
    limit: 50,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetChatMessages({
      chatId,
      limit: 50,
    });

  const { data: participants, isLoading: isParticipantsLoading } =
    useChatParticipants(chatId);

  console.log('participants', participants);
  const sections = useMemo(() => {
    const infiniteData = data as InfiniteData<ChatMessage[]> | undefined;

    const messages = infiniteData?.pages.flatMap(page => page) ?? [];

    return buildMessageSections({
      messages,
      meId: me?.id ?? '',
      participants: participants ?? [],
    });
  }, [data, me?.id, participants]);

  const handleEndReached = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleGoBack = () => {
    if (isLoading || isParticipantsLoading) {
      goBack();
      return;
    }

    updateLastSeenChatAction(chatId);

    chatsCache.updateChat({
      chatId,
      hasUnread: false,
    });

    goBack();
  };

  useEffect(() => {
    updateLastSeenChatAction(chatId);
  }, [chatId]);

  return {
    sections,
    params,
    participants,
    isTalent,
    me,
    hasNextPage,
    isFetchingNextPage,
    isLoadingMessages: isLoading || isParticipantsLoading,
    fetchNextPage,
    handleEndReached,
    handleGoBack,
  };
};
