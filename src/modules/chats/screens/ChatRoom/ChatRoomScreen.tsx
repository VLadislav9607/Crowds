import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenWrapper, AppModal } from '@components';
import { AppButton } from '@ui';
import { ChatType, useDeleteMessage } from '@actions';
import { showErrorToast } from '@helpers';
import { queryClient, supabase } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';
import { COLORS } from '@styles';
import { useState, useCallback } from 'react';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

import { MessageList, SendMessageInput } from '../../components';
import { IMessageData } from '../../ui';
import { messagesCache, chatsCache } from '../../cache';
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
  const [isActionsVisible, setIsActionsVisible] = useState(false);
  const [editingMessage, setEditingMessage] = useState<{ id: string; text: string; isEdited?: boolean } | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { mutateAsync: deleteMessage } = useDeleteMessage();

  const chatId = params?.chatId ?? '';

  const selectedHasImage = !!selectedMessage?.imagePath && !!selectedMessage?.imageBucket;

  const handleMessageLongPress = useCallback((message: IMessageData) => {
    setSelectedMessage(message);
    setIsActionsVisible(true);
  }, []);

  const handleImagePress = useCallback(async (message: IMessageData) => {
    if (!message.imagePath || !message.imageBucket) return;
    try {
      const { data, error } = await supabase.storage
        .from(message.imageBucket)
        .createSignedUrl(message.imagePath, 60);
      if (error || !data?.signedUrl) throw new Error('Failed to get URL');

      const localPath = `${RNFS.TemporaryDirectoryPath}/${message.id}.png`;
      const dl = RNFS.downloadFile({ fromUrl: data.signedUrl, toFile: localPath });
      await dl.promise;
      await Share.open({ url: `file://${localPath}`, type: 'image/png', failOnCancel: false });
    } catch (e: any) {
      if (e?.message !== 'User did not share') {
        showErrorToast('Failed to open image');
      }
    }
  }, []);

  const handleCloseModal = () => {
    setIsActionsVisible(false);
  };

  const handleEdit = () => {
    if (!selectedMessage) return;
    setEditingMessage({ id: selectedMessage.id, text: selectedMessage.text, isEdited: selectedMessage.isEdited });
    setIsActionsVisible(false);
  };

  const handleDelete = async () => {
    if (!selectedMessage) return;
    const messageId = selectedMessage.id;
    setSelectedMessage(null);

    // Optimistic remove
    messagesCache.removeMessage({ chatId, messageId });

    // Update chat preview with previous message
    const remaining = sections.flatMap(s => s.data).filter(m => m.id !== messageId);
    const prev = remaining.sort((a, b) => b.time.localeCompare(a.time))[0];
    chatsCache.updateChat({
      chatId,
      lastMessage: prev ? (prev.text || (prev.imagePath ? 'Image' : '')) : null,
    });

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

  const handleDownload = async () => {
    const msg = selectedMessage;
    if (!msg?.imagePath || !msg?.imageBucket) return;

    setIsDownloading(true);
    try {
      const { data, error } = await supabase.storage
        .from(msg.imageBucket)
        .createSignedUrl(msg.imagePath, 60);

      if (error || !data?.signedUrl) throw new Error('Failed to get URL');

      const fileName = `${msg.id}.png`;
      const localPath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;

      const dl = RNFS.downloadFile({ fromUrl: data.signedUrl, toFile: localPath });
      const res = await dl.promise;
      if (res.statusCode && res.statusCode >= 400) throw new Error('Download failed');

      await Share.open({ url: `file://${localPath}`, type: 'image/png', failOnCancel: false });
    } catch (e: any) {
      if (e?.message !== 'User did not share') {
        showErrorToast('Failed to download image');
      }
    } finally {
      setIsDownloading(false);
      setSelectedMessage(null);
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
          onImagePress={handleImagePress}
        />

        <SendMessageInput
          chatId={chatId}
          editingMessage={editingMessage}
          onCancelEdit={handleCancelEdit}
          onEditSuccess={handleEditSuccess}
        />
      </KeyboardAvoidingView>

      {/* Actions modal (long press) */}
      <AppModal
        isVisible={isActionsVisible}
        onModalHide={() => setSelectedMessage(null)}
        onClose={handleCloseModal}
        title=""
        style={styles.bottomModal}
        contentContainerStyle={styles.bottomModalContent}
      >
        {!selectedHasImage && (
          <AppButton
            title="Edit"
            size="60"
            variant="withBorder"
            mb={10}
            onPress={handleEdit}
          />
        )}
        {selectedHasImage && (
          <AppButton
            title="Save Image"
            size="60"
            variant="withBorder"
            mb={10}
            isLoading={isDownloading}
            loadingColor={COLORS.gray_primary}
            onPress={handleDownload}
          />
        )}
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
