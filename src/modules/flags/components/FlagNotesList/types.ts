import { IFlagNote } from '../../screens/FlagParticipant/types';

export interface FlagNotesListProps {
  notes: IFlagNote[];
  isLoading?: boolean;
}

export const FLAG_REASONS = {
  no_show: 'No Show',
  late_cancel: 'Cancel event 48 hours before',
  bad_behavior: 'Bad behavior',
  terms_violation: 'Terms violation',
  talent_complaint: 'Talent Complaint',
  auto_escalation: 'Auto-escalation from yellow flag',
  flag_report_resolved: 'Suspended by administrator',
  yellow_flag_auto_expiration: 'Yellow flag automatically expired',
  red_flag_auto_expiration: 'Red flag automatically expired',
};
