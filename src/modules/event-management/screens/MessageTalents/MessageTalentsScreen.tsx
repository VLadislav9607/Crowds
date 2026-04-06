import { useState } from 'react';
import { AppFlashList, If, NoAccess, ScreenWrapper } from '@components';
import { Screens, useScreenNavigation, goToScreen } from '@navigation';
import { useEventParticipantsByStatus, useGetMe } from '@actions';
import {
  IEventParticipant,
  TalentProfileRow,
  TalentsListSkeleton,
  useCreateChatAndNavigate,
} from '@modules/common';
import { AppButton } from '@ui';
import { ICONS } from '@assets';

import { styles } from './styles';

export const MessageTalentsScreen = () => {
  const { organizationMember } = useGetMe();
  const hasAccess =
    !!organizationMember?.current_context?.capabilitiesAccess
      .message_applicants;

  const { params } = useScreenNavigation<Screens.MessageTalents>();
  const [selectedTalentId, setSelectedTalentId] = useState<string | null>(null);

  const eventId = params?.eventId ?? '';

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useEventParticipantsByStatus({
      eventId,
      status: 'approved',
    });

  const { openChat, isPending: isCreatingChat } = useCreateChatAndNavigate();

  const chatWithTalent = (talent: IEventParticipant) => {
    setSelectedTalentId(talent.talentId);
    openChat({
      eventId,
      talentId: talent.talentId ?? '',
      title: talent.name ?? '',
      imageUrl: talent.avatar_url ?? '',
    });
  };

  const participants = data?.pages.flatMap(page => page.data) || [];
  const skeleton = isLoading ? <TalentsListSkeleton /> : undefined;

  return (
    <ScreenWrapper
      title="Message Talents"
      headerVariant="withTitleAndImageBg"
      headerImageBg="crowd"
      contentContainerStyle={styles.contentContainer}
    >
      <If condition={hasAccess}>
        <AppFlashList
          data={participants}
          emptyText="No approved talents found"
          gap={0}
          skeleton={skeleton}
          showBottomLoader={isFetchingNextPage}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            const isSelected = item.talentId === selectedTalentId;
            return (
              <TalentProfileRow
                talent={item}
                showMenu={false}
                onPressCard={() =>
                  goToScreen(Screens.ApplicantProfile, {
                    applicantId: item.talentId,
                  })
                }
                renderRightAction={() => (
                  <AppButton
                    icon={ICONS.chats('black')}
                    title="Chat"
                    isLoading={isSelected && isCreatingChat}
                    onPress={() => chatWithTalent(item)}
                    size="28"
                    wrapperStyles={styles.messageButton}
                    titleStyles={styles.messageButtonText}
                    width={94}
                  />
                )}
              />
            );
          }}
          onEndReached={
            hasNextPage
              ? () => {
                  if (!isFetchingNextPage) {
                    fetchNextPage();
                  }
                }
              : undefined
          }
        />
      </If>
      <If condition={!hasAccess}>
        <NoAccess />
      </If>
    </ScreenWrapper>
  );
};
