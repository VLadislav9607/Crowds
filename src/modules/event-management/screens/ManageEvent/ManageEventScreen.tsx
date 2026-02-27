import { useMemo, useState } from 'react';
import DatePicker from 'react-native-date-picker';

import { Screens, useScreenNavigation } from '@navigation';
import { useGetEventForOrgMember, useUpdateCheckinCutoff } from '@actions';

import { ManageEventScreenLayout } from '../../layouts';
import { EventManageBoard, ManageActionsList } from '../../components';

export const ManageEventScreen = () => {
  const { params } = useScreenNavigation<Screens.ManageEvent>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const eventId = params?.eventId ?? '';

  const { data: event } = useGetEventForOrgMember({ event_id: eventId });

  const { mutate: updateCheckinCutoff, isPending: isUpdatingCutoff } =
    useUpdateCheckinCutoff();

  const checkinCutoff = event?.checkin_cutoff ?? null;
  const endAt = event?.end_at ?? null;

  const isCutoffPassed = useMemo(() => {
    if (!checkinCutoff) return false;
    return new Date(checkinCutoff) < new Date();
  }, [checkinCutoff]);

  const datePickerDate = useMemo(() => {
    if (checkinCutoff) return new Date(checkinCutoff);
    return new Date();
  }, [checkinCutoff]);

  const onOpenEditCheckIn = () => {
    if (isCutoffPassed) return;
    setShowDatePicker(true);
  };

  const onConfirmCutoff = (date: Date) => {
    setShowDatePicker(false);
    updateCheckinCutoff({
      event_id: eventId,
      checkin_cutoff: date.toISOString(),
    });
  };

  return (
    <ManageEventScreenLayout
      eventTitle={event?.title ?? ''}
      eventLocation={
        event?.event_location?.formatted_address ?? ''
      }
    >
      <EventManageBoard
        checkinCutoff={checkinCutoff}
        isCutoffPassed={isCutoffPassed}
        isUpdating={isUpdatingCutoff}
        onOpenEditCheckIn={onOpenEditCheckIn}
      />

      <ManageActionsList eventId={eventId} />

      <DatePicker
        modal
        mode="datetime"
        open={showDatePicker}
        date={datePickerDate}
        minimumDate={event?.start_at ? new Date(event.start_at) : new Date()}
        maximumDate={endAt ? new Date(endAt) : undefined}
        onConfirm={onConfirmCutoff}
        onCancel={() => setShowDatePicker(false)}
      />
    </ManageEventScreenLayout>
  );
};
