import { AppFlashList } from '@components';
import { goToScreen, Screens } from '@navigation';
import { MyChatItem } from '@actions';

import { ChatItem } from '../../ui';
import { IChatListProps } from './types';
import { styles } from './styles';

export const ChatList = ({
  chats,
  isLoading = false,
  variant = 'talent',
  withBottomTab = false,
  emptyText = 'No chats found',
}: IChatListProps) => {
  const renderChat = ({ item, index }: { item: MyChatItem; index: number }) => {
    const isFirstChat = index === 0;
    const nextChat = chats[index + 1];
    const prevChat = chats[index - 1];
    const isNextUnread = nextChat?.hasUnread ?? false;
    const isPrevUnread = prevChat?.hasUnread ?? false;

    return (
      <ChatItem
        chat={item}
        variant={variant}
        onPress={() =>
          goToScreen(Screens.ChatRoom, {
            chatId: item.chatId,
            title: item.title,
            avatarUrl: item.avatarUrl ?? '',
          })
        }
        isFirstChat={isFirstChat}
        isNextUnread={isNextUnread}
        isPrevUnread={isPrevUnread}
      />
    );
  };

  return (
    <AppFlashList
      data={chats}
      keyExtractor={item => item.chatId}
      renderItem={renderChat}
      gap={0}
      showBottomLoader={isLoading}
      emptyText={emptyText}
      withBottomTab={withBottomTab}
      extraData={chats}
      contentContainerStyle={styles.container}
    />
  );
};
