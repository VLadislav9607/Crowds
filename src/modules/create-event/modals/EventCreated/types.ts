import { EventForOrgMemberDto } from '@actions';
import { ImperativeModalRef } from '@hooks';

export interface EventCreatedModalRefProps {
  event: EventForOrgMemberDto;
  isDraftPublished?: boolean;
}
export type EventCreatedModalRef =
  ImperativeModalRef<EventCreatedModalRefProps>;
