import { UseGetOrgEventsBodyDto } from '@actions';

export interface IOrganizationEventsListProps {
  filters: Omit<UseGetOrgEventsBodyDto, 'limit' | 'offset'>;
}
