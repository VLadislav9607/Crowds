import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScreenWrapper } from '@components';
import { useGetMe, useMyChats } from '@actions';

import { ChatList } from '../../components';
import { useChatsRealtime } from '../../hooks';

export const ChatsTabScreen = () => {
  const { isTalent } = useGetMe();

  const { data, isLoading, refetch } = useMyChats();

  useChatsRealtime();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <ScreenWrapper
      headerVariant="withLogoAndImageBg"
      title="My Messages"
      showBackButton={false}
      withBottomTabBar
    >
      <ChatList
        chats={data || []}
        isLoading={isLoading}
        variant={isTalent ? 'talent' : 'organization'}
        withBottomTab
      />
    </ScreenWrapper>
  );
};
