import { useCallback, useMemo } from 'react';
import { InfiniteData } from '@tanstack/react-query';

import {
  useChatParticipants,
  useGetChatMessages,
  GetChatMessagesResDto,
} from '@actions';
import { ScreenWrapper } from '@components';
import { Screens, useScreenNavigation } from '@navigation';

import { MessageList, SendMessageInput } from '../../components';
import { buildMessageSections } from '../../helpers';
import { useChatMessagesRealtime } from '../../hooks';

export const ChatRoomScreen = () => {
  const { params } = useScreenNavigation<Screens.ChatRoom>();

  const { data: participants, isLoading: isParticipantsLoading } =
    useChatParticipants(params?.chatId ?? '');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetChatMessages({
      chatId: params?.chatId ?? '',
      limit: 50,
    });

  useChatMessagesRealtime({
    chatId: params?.chatId ?? '',
    limit: 50,
  });

  const sections = useMemo(() => {
    const infiniteData = data as
      | InfiniteData<GetChatMessagesResDto>
      | undefined;
    const messages = infiniteData?.pages.flatMap(page => page.messages) ?? [];
    return buildMessageSections({
      messages,
      participants: participants ?? [],
    });
  }, [data, participants]);

  const handleEndReached = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title={params?.title ?? ''}
      avatarUrl={params?.avatarUrl ?? ''}
      withBottomTabBar
    >
      <MessageList
        sections={sections}
        isLoading={isLoading || isParticipantsLoading}
        onEndReached={handleEndReached}
      />

      <SendMessageInput chatId={params?.chatId ?? ''} />
    </ScreenWrapper>
  );
};
