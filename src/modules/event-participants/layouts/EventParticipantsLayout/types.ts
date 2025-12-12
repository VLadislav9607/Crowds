import { ReactNode } from 'react';

export type ParticipantTab = 'checked_in' | 'checked_out' | 'completed_tasks' | 'no_show';

export interface EventParticipantsScreenLayoutProps {
  children: ReactNode;
  selectedTab: ParticipantTab;
  onTabChange: (tab: ParticipantTab) => void;
}
