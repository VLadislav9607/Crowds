import { View } from 'react-native';

import { AppButton, AppText } from '@ui';
import { ICONS } from '@assets';

import { BaseEventCard, IBaseEventCardProps, cardStyles } from '../../ui';

interface IActiveUpcomingEventCardProps extends IBaseEventCardProps {
  showParticipants?: boolean;
}

export const ActiveUpcomingEventCard = ({
  event,
  showParticipants = true,
}: IActiveUpcomingEventCardProps) => {
  const handleManageEvent = () => {
    // TODO: Navigate to manage event
  };

  const handleViewApplicants = () => {
    // TODO: Navigate to view applicants
  };

  const headerRight = showParticipants ? (
    <AppText style={cardStyles.participants}>
      TALENT FILLED {event.participants}/{event.maxParticipants}
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
        onPress={handleManageEvent}
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
    <BaseEventCard event={event} headerRight={headerRight} footer={footer} />
  );
};
