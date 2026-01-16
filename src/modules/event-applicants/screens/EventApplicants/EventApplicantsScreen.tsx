import { View } from 'react-native';
import { useMemo, useState } from 'react';
import { AppTabSelector, ScreenWrapper } from '@components';
import { ICONS } from '@assets';
import { AppButton, AppText, IconButton } from '@ui';
import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import {
  useEventParticipantsByStatus,
  useEventParticipantsCounts,
  useAcceptTalentApplication,
  useRejectTalentApplication,
} from '@actions';

import { styles } from './styles';
import { ApplicantsList } from '../../components';
import { EventApplicantTab, getTabOptions, TAB_PARAMS } from './types';

export const EventApplicantsScreen = () => {
  const { params } = useScreenNavigation<Screens.EventApplicants>();
  const [selectedTab, setSelectedTab] = useState<EventApplicantTab>('invited');

  const eventId = params?.eventId ?? '';

  const currentParams = useMemo(() => TAB_PARAMS[selectedTab], [selectedTab]);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useEventParticipantsByStatus({
      eventId,
      status: currentParams.status,
      initiatedBy: currentParams.initiatedBy,
    });

  console.log('data', data);

  const counts = useEventParticipantsCounts(eventId);

  const acceptApplication = useAcceptTalentApplication();
  const rejectApplication = useRejectTalentApplication();

  const handleAccept = (participationId: string) => {
    acceptApplication.mutate({ participationId });
  };

  const handleDecline = (participationId: string) => {
    rejectApplication.mutate({ participationId });
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
              {counts.invited}/ {params?.capacity} Talent Invited
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

        {/* <AppText typography="regular_10" style={styles.sortByText}>
          Sort by: Gender, Green Flag, Availability
        </AppText> */}
      </View>

      <ApplicantsList
        variant={selectedTab}
        isLoading={isLoading}
        data={data?.pages.flatMap(page => page.data) || []}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isAccepting={acceptApplication.isPending}
        isRejecting={rejectApplication.isPending}
        handleAccept={handleAccept}
        handleDecline={handleDecline}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        handlePressMessage={() => {}}
      />
    </ScreenWrapper>
  );
};
