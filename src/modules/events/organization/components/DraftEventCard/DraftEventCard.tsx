import { View } from 'react-native';

import { AppButton } from '@ui';
import { ICONS } from '@assets';

import { IOrgBaseEventCardProps, OrgBaseEventCard, cardStyles } from '../../ui';

export const DraftEventCard = ({ event }: IOrgBaseEventCardProps) => {
  const handlePostToJobBoard = () => {
    // TODO: Post to job board
  };

  const footer = (
    <View style={cardStyles.bottomButtons}>
      <AppButton
        title="Preview and post to job board"
        size="28"
        width={265}
        icon={ICONS.chevronRight('main')}
        iconPlace="right"
        onPress={handlePostToJobBoard}
        wrapperStyles={cardStyles.primaryButton}
        titleStyles={cardStyles.primaryButtonText}
      />
      {/* <AppButton
        title="EDIT EVENT"
        size="28"
        width={70}
        onPress={handleEditEvent}
        wrapperStyles={cardStyles.transparentButton}
        titleStyles={cardStyles.transparentButtonText}
      /> */}
    </View>
  );

  return <OrgBaseEventCard event={event} footer={footer} />;
};
