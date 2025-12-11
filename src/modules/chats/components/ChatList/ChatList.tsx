import { AppFlashList } from '@components';
import { goToScreen, Screens } from '@navigation';

import { ChatItem, IChatData } from '../../ui';
import { IChatListProps } from './types';
import { styles } from './styles';

export const ChatList = ({
  chats,
  variant = 'talent',
  withBottomTab = false,
  emptyText = 'No chats found',
}: IChatListProps) => {
  const renderChat = ({ item, index }: { item: IChatData; index: number }) => {
    const isFirstChat = index === 0;
    const nextChat = chats[index + 1];
    const prevChat = chats[index - 1];
    const isNextUnread = nextChat?.isUnread ?? false;
    const isPrevUnread = prevChat?.isUnread ?? false;

    return (
      <ChatItem
        chat={item}
        variant={variant}
        onPress={() => goToScreen(Screens.ChatRoom, { chatId: item.id })}
        isFirstChat={isFirstChat}
        isNextUnread={isNextUnread}
        isPrevUnread={isPrevUnread}
      />
    );
  };

  return (
    <AppFlashList
      data={chats}
      keyExtractor={item => item.id}
      renderItem={renderChat}
      gap={0}
      emptyText={emptyText}
      withBottomTab={withBottomTab}
      extraData={chats}
      contentContainerStyle={styles.container}
    />
  );
};
