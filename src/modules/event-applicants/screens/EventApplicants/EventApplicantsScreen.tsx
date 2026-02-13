import { View } from 'react-native';
import { useMemo, useState } from 'react';
import { AppTabSelector, ScreenWrapper } from '@components';
import { ICONS } from '@assets';
import { AppButton, AppText, IconButton } from '@ui';
import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import {
  useEventParticipantsByStatus,
  useEventParticipantsCounts,
  useRejectTalentApplication,
} from '@actions';
import { IEventParticipant, useCreateChatAndNavigate } from '@modules/common';
import { YellowFlagInviteWarningModal } from '../../../flags/modals';

import { styles } from './styles';
import { ApplicantsList } from '../../components';
import { EventApplicantTab, getTabOptions, TAB_PARAMS } from './types';
import { useAcceptApplication } from '../../hooks';

export const EventApplicantsScreen = () => {
  const { params } = useScreenNavigation<Screens.EventApplicants>();
  const [selectedTab, setSelectedTab] = useState<EventApplicantTab>('invited');
  const [selectedTalentId, setSelectedTalentId] = useState<string | null>(null);

  const eventId = params?.eventId ?? '';

  const currentParams = useMemo(() => TAB_PARAMS[selectedTab], [selectedTab]);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useEventParticipantsByStatus({
      eventId,
      status: currentParams.status,
      initiatedBy: currentParams.initiatedBy,
    });

  const counts = useEventParticipantsCounts(eventId);

  const {
    handleAccept,
    yellowFlagModal,
    closeYellowFlagModal,
    confirmYellowFlagModal,
    isPending: isAccepting,
  } = useAcceptApplication(setSelectedTalentId);
  const rejectApplication = useRejectTalentApplication();

  const { openChat, isPending: isCreatingChat } = useCreateChatAndNavigate();

  const chatWithTalent = (talent: IEventParticipant) => {
    setSelectedTalentId(talent.talentId);
    openChat({
      eventId: params?.eventId ?? '',
      talentId: talent.talentId ?? '',
      title: talent.name ?? '',
      imageUrl: talent.avatar_url ?? '',
    });
  };

  const handleDecline = (participationId: string, talentId: string) => {
    setSelectedTalentId(talentId);
    rejectApplication.mutate(
      { participationId },
      { onSettled: () => setSelectedTalentId(null) },
    );
  };

  return (
    <ScreenWrapper
      title="Applicants"
      headerVariant="withTitleAndImageBg"
      headerImageBg="crowd"
      contentContainerStyle={styles.contentContainer}
    >
      <AppTabSelector
        options={getTabOptions(counts)}
        selectedValue={selectedTab}
        onSelect={setSelectedTab}
        containerStyle={styles.tabSelector}
      />

      <View style={styles.filterContainer}>
        <View style={styles.row}>
          <View style={styles.invitedContainer}>
            <AppText typography="bold_12">
              {counts.invited}/{' '}
              {params?.capacity ? params.capacity - counts.approved : 0} Talent
              Invited
            </AppText>
            <AppButton
              title="Invite More"
              width={90}
              size="31"
              onPress={() => goToScreen(Screens.InviteTalents, { eventId })}
              wrapperStyles={styles.inviteMoreButton}
            />
          </View>

          <IconButton
            icon={ICONS.filter('typography_black')}
            iconSize={22}
            style={styles.filterButton}
          />
        </View>
      </View>

      <ApplicantsList
        variant={selectedTab}
        selectedTalentId={selectedTalentId ?? undefined}
        isCreatingChat={isCreatingChat}
        isLoading={isLoading}
        data={data?.pages.flatMap(page => page.data) || []}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isAccepting={isAccepting}
        isRejecting={rejectApplication.isPending}
        handleAccept={handleAccept}
        handleDecline={handleDecline}
        popUpItems={(talent: IEventParticipant) => [
          {
            label: 'Add flag',
            value: 'flag',
            onPress: () =>
              goToScreen(Screens.FlagParticipant, {
                talentId: talent.talentId ?? '',
                eventId: eventId,
              }),
          },
        ]}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        handlePressMessage={chatWithTalent}
      />

      <YellowFlagInviteWarningModal
        isVisible={yellowFlagModal?.visible ?? false}
        flag={yellowFlagModal?.flag ?? null}
        onClose={closeYellowFlagModal}
        onConfirm={confirmYellowFlagModal}
        isInviting={isAccepting}
        confirmLabel="Accept"
        questionText="Would you like to accept their application anyway?"
      />
    </ScreenWrapper>
  );
};
