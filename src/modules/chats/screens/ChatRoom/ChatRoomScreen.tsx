import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenWrapper } from '@components';
import { ChatType } from '@actions';

import { MessageList, SendMessageInput } from '../../components';
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

  const directChatParticipant = participants?.find(
    participant => participant.user_id !== me?.id,
  );

  const getHeaderTitle = () => {
    if (params?.chatType === ChatType.Direct) {
      return directChatParticipant?.display_name;
    }
    return 'Group messages';
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
          isTalent={!!isTalent}
          chatType={params?.chatType ?? ChatType.Direct}
          sections={sections}
          isLoading={isLoadingMessages}
          onEndReached={handleEndReached}
        />

        <SendMessageInput chatId={params?.chatId ?? ''} />
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
});
