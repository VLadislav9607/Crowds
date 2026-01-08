import { ScreenWrapper } from '@components';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MessageList, SendMessageInput } from '../../components';
import { useChatRoomScreen } from './useChatRoomScreen';

export const ChatRoomScreen = () => {
  const {
    sections,
    params,
    isLoadingMessages,
    handleEndReached,
    handleGoBack,
  } = useChatRoomScreen();
  const { top } = useSafeAreaInsets();

  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title={params?.chatType === 'direct' ? params?.title : 'Group messages'}
      avatarUrl={params?.imageUrl ?? ''}
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
