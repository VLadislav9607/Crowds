import { ManageEventScreenLayout } from '../../layouts';
import { EventManageBoard, ManageActionsList } from '../../components';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import { Screens, useScreenNavigation } from '@navigation';

export const ManageEventScreen = () => {
  const { params } = useScreenNavigation<Screens.ManageEvent>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <ManageEventScreenLayout
      eventTitle="Fun Live Stage Segment, Single Guys"
      eventLocation="Nottingham Royal Concert Hall"
    >
      <EventManageBoard onOpenEditCheckIn={() => setShowDatePicker(true)} />

      <ManageActionsList eventId={params?.eventId ?? ''} />

      <DatePicker
        modal
        mode="time"
        open={showDatePicker}
        date={new Date()}
        onConfirm={() => setShowDatePicker(false)}
        onCancel={() => setShowDatePicker(false)}
      />
    </ManageEventScreenLayout>
  );
};
