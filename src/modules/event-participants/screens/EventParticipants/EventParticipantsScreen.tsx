import { useState } from 'react';

import { EventParticipantsList, IEventParticipant } from '../../components';
import { EventParticipantsScreenLayout, ParticipantTab } from '../../layouts';

const MOCK_PARTICIPANTS: IEventParticipant[] = [
  {
    id: '1',
    name: 'John Doe',
    location: 'Melbourne VIC',
    status: 'checked_in',
    time: '9.10am',
    flag: 'green',
  },
  {
    id: '2',
    name: 'Jane Smith',
    location: 'Melbourne VIC',
    status: 'checked_out',
    time: '9.10am',
    flag: 'red',
  },
  {
    id: '3',
    name: 'Bob Wilson',
    location: 'Melbourne VIC',
    status: 'completed_tasks',
    time: '9.10am',
    flag: 'yellow',
  },
  {
    id: '4',
    name: 'Alice Brown',
    location: 'Melbourne VIC',
    status: 'completed_tasks',
    time: '9.10am',
    flag: 'black',
  },
  {
    id: '5',
    name: 'John Doe',
    location: 'Melbourne VIC',
    status: 'no_show',
    time: '9.10am',
    flag: 'black',
  },
  {
    id: '6',
    name: 'John Doe',
    location: 'Melbourne VIC',
    status: 'no_show',
    time: '9.10am',
    flag: 'black',
  },
];

export const EventParticipantsScreen = () => {
  const [selectedTab, setSelectedTab] = useState<ParticipantTab>('checked_in');

  const filteredParticipants = MOCK_PARTICIPANTS.filter(
    p => p.status === selectedTab,
  );

  return (
    <EventParticipantsScreenLayout
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
    >
      <EventParticipantsList participants={filteredParticipants} />
    </EventParticipantsScreenLayout>
  );
};
