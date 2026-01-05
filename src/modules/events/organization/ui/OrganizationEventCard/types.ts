import { OrgEventListItemDto } from '@actions';

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
  event: OrgEventListItemDto;
}

export interface IOrganizationEventCardProps {
  event: OrgEventListItemDto;
}
