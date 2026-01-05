import { AppButton } from '@ui';
import { OrgBaseEventCard, cardStyles, IOrgBaseEventCardProps } from '../../ui';
import { ICONS } from '@assets';

export const PastEventCard = ({ event }: IOrgBaseEventCardProps) => {
  const headerRight = (
    <AppButton
      title="VIEW"
      size="28"
      width={75}
      onPress={() => {}}
      iconPlace="right"
      icon={ICONS.chevronRight('main')}
      wrapperStyles={cardStyles.primaryButton}
      titleStyles={cardStyles.primaryButtonText}
    />
  );

  return <OrgBaseEventCard event={event} headerRight={headerRight} />;
};
