import { AppButton } from '@ui';
import { BaseEventCard, cardStyles, IBaseEventCardProps } from '../../ui';
import { ICONS } from '@assets';

export const PastEventCard = ({ event }: IBaseEventCardProps) => {
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

  return <BaseEventCard event={event} headerRight={headerRight} />;
};
