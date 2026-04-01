import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenWrapper, AppModal } from '@components';
import { AppButton } from '@ui';
import { ChatType, useDeleteMessage } from '@actions';
import { showErrorToast } from '@helpers';
import { queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { COLORS } from '@styles';
import { useState, useCallback } from 'react';

import { MessageList, SendMessageInput } from '../../components';
import { IMessageData } from '../../ui';
import { messagesCache } from '../../cache';
import { useChatRoomScreen } from './useChatRoomScreen';

export const ChatRoomScreen = () => {
  const { top } = useSafeAreaInsets();
  const {
    sections,
    participants,
    me,
    params,
    isTalent,
    isLoadingMessages,
    handleEndReached,
    handleGoBack,
  } = useChatRoomScreen();

  const [selectedMessage, setSelectedMessage] = useState<IMessageData | null>(null);
  const [editingMessage, setEditingMessage] = useState<{ id: string; text: string; isEdited?: boolean } | null>(null);
  const { mutateAsync: deleteMessage } = useDeleteMessage();

  const chatId = params?.chatId ?? '';

  const handleMessageLongPress = useCallback((message: IMessageData) => {
    setSelectedMessage(message);
  }, []);

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  const handleEdit = () => {
    if (!selectedMessage) return;
    setEditingMessage({ id: selectedMessage.id, text: selectedMessage.text, isEdited: selectedMessage.isEdited });
    setSelectedMessage(null);
  };

  const handleDelete = async () => {
    if (!selectedMessage) return;
    const messageId = selectedMessage.id;
    setSelectedMessage(null);

    // Optimistic remove
    messagesCache.removeMessage({ chatId, messageId });

    try {
      await deleteMessage({ messageId });
    } catch {
      // Refetch messages to restore deleted message in cache
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_QUERY_KEYS.GET_CHAT_MESSAGES],
      });
      showErrorToast('Failed to delete message');
    }
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
  };

  const handleEditSuccess = () => {
    setEditingMessage(null);
  };

  const directChatParticipant = participants?.find(
    participant => participant.user_id !== me?.id,
  );

  const getHeaderTitle = () => {
    if (params?.chatType === ChatType.Direct) {
      return directChatParticipant?.display_name;
    }
    return params?.title || 'Group messages';
  };

  const getImageHeader = () => {
    if (params?.chatType === ChatType.Direct) {
      return directChatParticipant?.avatar_url;
    }

    return '';
  };

  const getBucket = () => {
    if (params?.chatType === ChatType.Direct) {
      return isTalent ? 'brand_avatars' : 'talents_avatars';
    }

    return 'brand_avatars';
  };

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title={getHeaderTitle()}
      avatarUrl={getImageHeader() ?? ''}
      bucket={getBucket()}
      withBottomTabBar
      goBackCallback={handleGoBack}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? top + 60 : 0}
      >
        <MessageList
          chatType={params?.chatType ?? ChatType.Direct}
          sections={sections}
          isLoading={isLoadingMessages}
          onEndReached={handleEndReached}
          onMessageLongPress={handleMessageLongPress}
        />

        <SendMessageInput
          chatId={chatId}
          editingMessage={editingMessage}
          onCancelEdit={handleCancelEdit}
          onEditSuccess={handleEditSuccess}
        />
      </KeyboardAvoidingView>

      <AppModal
        isVisible={!!selectedMessage}
        onClose={handleCloseModal}
        title="Message"
        style={styles.bottomModal}
        contentContainerStyle={styles.bottomModalContent}
      >
        <AppButton
          title="Edit"
          size="60"
          variant="withBorder"
          mb={10}
          onPress={handleEdit}
        />
        <AppButton
          title="Delete"
          size="60"
          wrapperStyles={styles.deleteButton}
          titleStyles={styles.deleteButtonText}
          onPress={handleDelete}
        />
      </AppModal>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomModalContent: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  deleteButton: {
    backgroundColor: COLORS.red_20,
  },
  deleteButtonText: {
    color: COLORS.red,
  },
});
