import { IPopupMenuItem } from '@components';
import { ParticipantStatus } from './types';

export const EVENT_PARTICIPANT_POPUP_ITEMS: IPopupMenuItem[] = [
  { label: 'Mark as no show', value: 'mark_no_show' },
  { label: 'Add flag', value: 'add_flag' },
  { label: 'Report', value: 'report' },
];

export const EVENT_PARTICIPANT_STATUS_TEXT: Record<ParticipantStatus, string> =
  {
    checked_in: 'Checked in',
    checked_out: 'Checked out',
    completed_tasks: 'Preview Image',
    no_show: 'No show',
  };
