import { View } from 'react-native';

import { AppButton } from '@ui';
import { ICONS } from '@assets';

import { BaseEventCard, IBaseEventCardProps, cardStyles } from '../../ui';

export const DraftEventCard = ({ event }: IBaseEventCardProps) => {
  const handleInviteTalent = () => {
    // TODO: Navigate to invite talent
  };

  const handlePostToJobBoard = () => {
    // TODO: Post to job board
  };

  const handleEditEvent = () => {
    // TODO: Navigate to edit event
  };

  const headerRight = (
    <AppButton
      title="INVITE TALENT"
      size="28"
      width={80}
      onPress={handleInviteTalent}
      wrapperStyles={cardStyles.transparentButton}
      titleStyles={cardStyles.inviteTalentButtonText}
    />
  );

  const footer = (
    <View style={cardStyles.bottomButtons}>
      <AppButton
        title="POST To Job Board"
        size="28"
        width={167}
        icon={ICONS.chevronRight('main')}
        iconPlace="right"
        onPress={handlePostToJobBoard}
        wrapperStyles={cardStyles.primaryButton}
        titleStyles={cardStyles.primaryButtonText}
      />
      <AppButton
        title="EDIT EVENT"
        size="28"
        width={70}
        onPress={handleEditEvent}
        wrapperStyles={cardStyles.transparentButton}
        titleStyles={cardStyles.transparentButtonText}
      />
    </View>
  );

  return (
    <BaseEventCard event={event} headerRight={headerRight} footer={footer} />
  );
};
