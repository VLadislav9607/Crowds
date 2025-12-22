import { FlagParticipantScreenLayout } from '../../layouts';
import { FlagNotesList } from '../../components';
import { FlagParticipantForm } from '../../forms';
import { IFlagNote, IParticipantInfo } from './types';

const MOCK_PARTICIPANT: IParticipantInfo = {
  id: '1',
  name: 'Michael Ullasi',
  avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
  gender: 'Male',
  age: 28,
  location: 'NSW',
};

const MOCK_NOTES: IFlagNote[] = [
  {
    id: '1',
    date: '23.1.2023',
    eventName: 'Netflix',
    title: 'No show',
    flag: 'red',
  },
  {
    id: '2',
    date: '14.2.2023',
    eventName: 'Heat Nightclub',
    title: 'Crude behaviour',
    description:
      'Repeatedly asked to refrain from making sexual gestures because they were making others uncomfortable.',
    flag: 'red',
  },
  {
    id: '3',
    date: '19.2.2023',
    eventName: 'City of Melbourne',
    title: 'No show',
    flag: 'red',
  },
  {
    id: '4',
    date: '3.3.2023',
    eventName: 'Boat Builders Bar',
    title: 'Bad language',
    description: 'Far too much swearing.',
    flag: 'yellow',
  },
];

export const FlagParticipantScreen = () => {
  return (
    <FlagParticipantScreenLayout participant={MOCK_PARTICIPANT}>
      <FlagParticipantForm />

      <FlagNotesList notes={MOCK_NOTES} />
    </FlagParticipantScreenLayout>
  );
};
