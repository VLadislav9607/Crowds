export type EventCardType = 'draft' | 'active' | 'upcoming' | 'past';

export interface IEventData {
  id: string;
  name: string;
  image: string;
  location: string;
  date: string;
  duration: string;
  participants?: number;
  maxParticipants?: number;
}

export interface IBaseEventCardProps {
  event: IEventData;
}

export interface IOrganizationEventCardProps {
  event: IEventData;
  cardType: EventCardType;
}
