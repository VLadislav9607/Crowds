import { useMemo, useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { getTimezoneOffset } from 'date-fns-tz';

import { Screens, useScreenNavigation } from '@navigation';
import {
  useGetEventForOrgMember,
  useUpdateCheckinOpensAt,
} from '@actions';

import { ManageEventScreenLayout } from '../../layouts';
import { EventManageBoard, ManageActionsList } from '../../components';

export const ManageEventScreen = () => {
  const { params } = useScreenNavigation<Screens.ManageEvent>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const eventId = params?.eventId ?? '';

  const { data: event } = useGetEventForOrgMember({ event_id: eventId });
  const { mutate: updateCheckinOpensAt, isPending: isUpdating } =
    useUpdateCheckinOpensAt();

  const deviceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const eventTimezone = event?.event_location?.timezone || deviceTimezone;

  const timezoneOffsetInMinutes = useMemo(
    () => getTimezoneOffset(eventTimezone) / 60000,
    [eventTimezone],
  );

  const checkinOpensAt = event?.checkin_opens_at ?? null;
  const checkinClosesAt = event?.start_at ?? null;

  const isBumpInPassed = useMemo(() => {
    if (!checkinOpensAt) return false;
    return new Date(checkinOpensAt) < new Date();
  }, [checkinOpensAt]);

  // TODO: ideally check from DB if any talent has checked in
  // For now, use bump-in passed as proxy (if bump-in time has passed, check-in may have started)
  const hasAnyCheckins = false;

  const datePickerDate = useMemo(() => {
    if (checkinOpensAt) return new Date(checkinOpensAt);
    if (event?.start_at) {
      // Default to 1 hour before start
      const d = new Date(event.start_at);
      d.setHours(d.getHours() - 1);
      return d;
    }
    return new Date();
  }, [checkinOpensAt, event?.start_at]);

  const onOpenEditBumpIn = () => {
    if (isBumpInPassed || hasAnyCheckins) return;
    setShowDatePicker(true);
  };

  const onConfirmBumpIn = (date: Date) => {
    setShowDatePicker(false);
    updateCheckinOpensAt({
      event_id: eventId,
      checkin_opens_at: date.toISOString(),
    });
  };

  return (
    <ManageEventScreenLayout
      eventTitle={event?.title ?? ''}
    >
      <EventManageBoard
        checkinOpensAt={checkinOpensAt}
        checkinClosesAt={checkinClosesAt}
        timezone={eventTimezone}
        isBumpInPassed={isBumpInPassed}
        hasAnyCheckins={hasAnyCheckins}
        isUpdating={isUpdating}
        onOpenEditBumpIn={onOpenEditBumpIn}
      />

      <ManageActionsList eventId={eventId} eventStartAt={event?.start_at} />

      <DatePicker
        modal
        mode="datetime"
        open={showDatePicker}
        date={datePickerDate}
        maximumDate={event?.start_at ? new Date(event.start_at) : undefined}
        timeZoneOffsetInMinutes={timezoneOffsetInMinutes}
        onConfirm={onConfirmBumpIn}
        onCancel={() => setShowDatePicker(false)}
      />
    </ManageEventScreenLayout>
  );
};
