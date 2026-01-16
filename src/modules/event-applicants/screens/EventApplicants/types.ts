import {
  EventParticipantInitiatedBy,
  EventParticipantsCountsRespDto,
  EventParticipantStatus,
} from '@actions';
import { ITabOption } from '@components';

export type EventApplicantTab = 'invited' | 'applied' | 'approved' | 'rejected';

export const TAB_PARAMS: Record<
  EventApplicantTab,
  {
    status: EventParticipantStatus;
    initiatedBy?: EventParticipantInitiatedBy;
  }
> = {
  invited: {
    status: 'pending',
    initiatedBy: 'organization',
  },
  applied: {
    status: 'pending',
    initiatedBy: 'talent',
  },
  approved: {
    status: 'approved',
  },
  rejected: {
    status: 'rejected',
  },
};

export const getTabOptions = (
  counts: EventParticipantsCountsRespDto,
): ITabOption<EventApplicantTab>[] => [
  {
    label: 'Invited',
    value: 'invited',
    badge: counts.invited,
  },
  {
    label: 'Applied',
    value: 'applied',
    badge: counts.applied,
  },
  {
    label: 'Approved',
    value: 'approved',
    badge: counts.approved,
  },
  { label: 'Rejected', value: 'rejected', badge: counts.rejected },
];
