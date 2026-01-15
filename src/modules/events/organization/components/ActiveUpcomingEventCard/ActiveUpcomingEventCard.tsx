import { View } from 'react-native';

import { AppButton, AppText } from '@ui';
import { ICONS } from '@assets';
import { goToScreen, Screens } from '@navigation';

import { OrgBaseEventCard, IOrgBaseEventCardProps, cardStyles } from '../../ui';

interface IActiveUpcomingEventCardProps extends IOrgBaseEventCardProps {
  showParticipants?: boolean;
}

export const ActiveUpcomingEventCard = ({
  event,
  showParticipants = true,
}: IActiveUpcomingEventCardProps) => {
  const handleViewApplicants = () => {
    // TODO: Navigate to view applicants
  };

  const participantsCount = event?.event_age_groups?.reduce(
    (acc, curr) =>
      acc +
      (curr.male_count || 0) +
      (curr.female_count || 0) +
      (curr.other_count || 0),
    0,
  );

  const headerRight = showParticipants ? (
    // <AppText style={cardStyles.participants}>
    //   TALENT FILLED {0}/{participantsCount}
    // </AppText>

    <AppText style={cardStyles.participants}>
      {event?.participants_count || 0}/{participantsCount} TALENTS
    </AppText>
  ) : null;

  const footer = (
    <View style={cardStyles.bottomButtons}>
      <AppButton
        title="MANAGE EVENT"
        size="28"
        icon={ICONS.chevronRight('main')}
        iconPlace="right"
        width={141}
        onPress={() =>
          goToScreen(Screens.ManageEvent, { eventId: event?.id ?? '' })
        }
        wrapperStyles={cardStyles.primaryButton}
        titleStyles={cardStyles.primaryButtonText}
      />
      <AppButton
        title="VIEW APPLICANTS"
        size="28"
        width={93}
        onPress={handleViewApplicants}
        wrapperStyles={cardStyles.transparentButton}
        titleStyles={cardStyles.transparentButtonText}
      />
    </View>
  );

  return (
    <OrgBaseEventCard event={event} headerRight={headerRight} footer={footer} />
  );
};
