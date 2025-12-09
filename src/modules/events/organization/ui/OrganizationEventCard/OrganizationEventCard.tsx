import { IOrganizationEventCardProps } from './types';
import {
  DraftEventCard,
  ActiveUpcomingEventCard,
  PastEventCard,
} from '../../components';

export const OrganizationEventCard = ({
  event,
  cardType,
}: IOrganizationEventCardProps) => {
  switch (cardType) {
    case 'draft':
      return <DraftEventCard event={event} />;

    case 'active':
      return <ActiveUpcomingEventCard event={event} showParticipants={false} />;

    case 'upcoming':
      return <ActiveUpcomingEventCard event={event} showParticipants={true} />;

    case 'past':
      return <PastEventCard event={event} />;

    default:
      return <ActiveUpcomingEventCard event={event} />;
  }
};
