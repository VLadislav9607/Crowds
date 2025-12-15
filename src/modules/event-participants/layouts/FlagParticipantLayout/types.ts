import { ReactNode } from 'react';

import { IParticipantInfo } from '../../screens/FlagParticipant/types';

export interface FlagParticipantLayoutProps {
  children: ReactNode;
  participant: IParticipantInfo;
}

