import { StyleSheet } from 'react-native';

import { AppTabSelector, ScreenWrapper } from '@components';
import { AppText } from '@ui';
import { useState } from 'react';
import { OrganizationEventsList } from '../../components';

const events = [
  {
    id: 1,
    name: 'Fame game - Stadium extras',
    location: '333 Bridge Road, Richmond VIC Australia',
    image:
      'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
    startDate: '2021-01-01',
    isDraft: false,
    participants: 55,
    maxParticipants: 70,
  },
  {
    id: 2,
    name: 'Fame game - Stadium extras',
    location: '333 Bridge Road, Richmond VIC Australia',
    image:
      'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
    startDate: '2021-01-01',
    isDraft: false,
    participants: 55,
    maxParticipants: 70,
  },
  {
    id: 3,
    name: 'Fame game - Stadium extras',
    location: '333 Bridge Road, Richmond VIC Australia',
    image:
      'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
    startDate: '2021-01-01',
    isDraft: false,
    participants: 55,
    maxParticipants: 70,
  },
  {
    id: 4,
    name: 'Fame game - Stadium extras',
    location: '333 Bridge Road, Richmond VIC Australia',
    image:
      'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
    startDate: '2021-01-01',
    isDraft: false,
    participants: 55,
    maxParticipants: 70,
  },
  {
    id: 5,
    name: 'Fame game - Stadium extras',
    location: '333 Bridge Road, Richmond VIC Australia',
    image:
      'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
    startDate: '2021-01-01',
    isDraft: false,
    participants: 55,
    maxParticipants: 70,
  },
  {
    id: 6,
    name: 'Fame game - Stadium extras',
    location: '333 Bridge Road, Richmond VIC Australia',
    image:
      'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
    startDate: '2021-01-01',
    isDraft: false,
    participants: 55,
    maxParticipants: 70,
  },
];

export const UpcomingEventsTabScreen = () => {
  const [selectedTab, setSelectedTab] = useState('job_board');
  return (
    <ScreenWrapper
      headerVariant="withLogoAndImageBg"
      witBottomTab={true}
      contentContainerStyle={styles.contentContainer}
    >
      <AppText typography="extra_bold_18" margin={{ bottom: 16 }}>
        Upcoming Events
        <AppText typography="regular_14" color="grayscale_500">
          {' '}
          (10)
        </AppText>
      </AppText>

      <AppTabSelector
        options={[
          { label: 'Job Board', value: 'job_board' },
          { label: 'Private', value: 'private' },
        ]}
        selectedValue={selectedTab}
        onSelect={setSelectedTab}
      />

      <OrganizationEventsList events={events} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
});
