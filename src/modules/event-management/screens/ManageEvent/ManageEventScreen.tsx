import { useMemo, useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { getTimezoneOffset } from 'date-fns-tz';

import { Screens, useScreenNavigation } from '@navigation';
import {
  useGetEventForOrgMember,
  useUpdateCheckinCutoff,
} from '@actions';

import { ManageEventScreenLayout } from '../../layouts';
import { EventManageBoard, ManageActionsList } from '../../components';

export const ManageEventScreen = () => {
  const { params } = useScreenNavigation<Screens.ManageEvent>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const eventId = params?.eventId ?? '';

  const { data: event } = useGetEventForOrgMember({ event_id: eventId });
  const { mutate: updateCheckinCutoff, isPending: isUpdatingCutoff } =
    useUpdateCheckinCutoff();

  const deviceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const eventTimezone = event?.event_location?.timezone || deviceTimezone;

  const timezoneOffsetInMinutes = useMemo(
    () => getTimezoneOffset(eventTimezone) / 60000,
    [eventTimezone],
  );

  const endAt = event?.end_at ?? null;

  const defaultCutoff = useMemo(() => {
    if (!event?.start_at) return null;
    const date = new Date(event.start_at);
    date.setMinutes(date.getMinutes() + 15);
    return date.toISOString();
  }, [event?.start_at]);

  const checkinCutoff = event?.checkin_cutoff ?? defaultCutoff;

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
    >
      <EventManageBoard
        checkinCutoff={checkinCutoff}
        timezone={eventTimezone}
        isCutoffPassed={isCutoffPassed}
        isUpdating={isUpdatingCutoff}
        onOpenEditCheckIn={onOpenEditCheckIn}
      />

      <ManageActionsList eventId={eventId} eventStartAt={event?.start_at} />

      <DatePicker
        modal
        mode="datetime"
        open={showDatePicker}
        date={datePickerDate}
        minimumDate={event?.start_at ? new Date(event.start_at) : new Date()}
        maximumDate={endAt ? new Date(endAt) : undefined}
        timeZoneOffsetInMinutes={timezoneOffsetInMinutes}
        onConfirm={onConfirmCutoff}
        onCancel={() => setShowDatePicker(false)}
      />
    </ManageEventScreenLayout>
  );
};
