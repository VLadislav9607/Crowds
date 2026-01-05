import { EventCardType, IOrganizationEventCardProps } from './types';
import {
  DraftEventCard,
  ActiveUpcomingEventCard,
  PastEventCard,
} from '../../components';
import { OrgEventListItemDto } from '@actions';
import { isFuture, isPast } from 'date-fns';

export const OrganizationEventCard = ({
  event,
}: IOrganizationEventCardProps) => {
  const getOrgEventCardType = (
    eventData: OrgEventListItemDto,
  ): EventCardType => {
    if (eventData.status === 'draft') {
      return 'draft';
    }

    const isPastEvent = eventData.start_at && isPast(eventData.start_at);
    const isFutureEvent = eventData.start_at && isFuture(eventData.start_at);

    if (eventData.status === 'published' && isPastEvent) {
      return 'past';
    }

    if (eventData.status === 'published' && isFutureEvent) {
      return 'upcoming';
    }

    return 'active';
  };

  const cardType = getOrgEventCardType(event);

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
