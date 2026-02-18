import { If, NoAccess, ScreenWrapper } from '@components';
import { useGetMe, useMyChats } from '@actions';

import { ChatList } from '../../components';
import { useChatsRealtime } from '../../hooks';
import { styles } from './styles';

export const ChatsTabScreen = () => {
  const { isTalent, organizationMember } = useGetMe();

  const currentContext = organizationMember?.current_context;

  const hasAccessToChats = !!(
    isTalent ||
    currentContext?.capabilitiesAccess.group_message ||
    currentContext?.capabilitiesAccess.one_on_one_message
  );

  const { data, isLoading } = useMyChats({ enabled: hasAccessToChats });

  useChatsRealtime(hasAccessToChats);

  return (
    <ScreenWrapper
      headerVariant="withLogoAndImageBg"
      title="My Messages"
      showBackButton={false}
      withBottomTabBar
    >
      <If condition={hasAccessToChats}>
        <ChatList
          chats={data || []}
          isLoading={isLoading}
          variant={isTalent ? 'talent' : 'organization'}
          withBottomTab
        />
      </If>
      <If condition={!hasAccessToChats}>
        <NoAccess containerStyle={styles.noAccessContainer} />
      </If>
    </ScreenWrapper>
  );
};
