import { UseGetEventDetailsResDto } from '@actions';
import { ImperativeModalRef } from '@hooks';

export interface EventCreatedModalRefProps {
  event: UseGetEventDetailsResDto;
}
export type EventCreatedModalRef =
  ImperativeModalRef<EventCreatedModalRefProps>;
