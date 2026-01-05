import { Image, View } from 'react-native';
import { ReactNode } from 'react';
import { IconText, AppText, DashedLine } from '@ui';
import { ICONS } from '@assets';
import { cardStyles } from './styles';
import { OrgEventListItemDto } from '@actions';
import { formatInTimeZone } from 'date-fns-tz';
import { If } from '@components';
import { calculateEventDuration } from '../../../helpers';

export interface IOrgBaseEventCardProps {
  event?: OrgEventListItemDto;
  headerRight?: ReactNode;
  footer?: ReactNode;
}

export const OrgBaseEventCard = ({
  event,
  headerRight,
  footer,
}: IOrgBaseEventCardProps) => {
  const timezone = event?.event_location?.timezone || 'UTC';

  const startAt = event?.start_at
    ? formatInTimeZone(event.start_at, timezone, 'dd MMM, yyyy')
    : '';
  const eventDuration =
    event?.start_at && event?.end_at
      ? calculateEventDuration(event.start_at, event.end_at)
      : { formatted: '' };

  const peoplesCount = event?.event_age_groups?.reduce(
    (acc, curr) =>
      acc +
      (curr.male_count || 0) +
      (curr.female_count || 0) +
      (curr.other_count || 0),
    0,
  );

  // const peoplesCount =23
  const isSomeDetailsPresent =
    !!startAt || !!eventDuration.formatted || !!peoplesCount;
  const isLocationPresent = !!event?.event_location?.formatted_address;

  const isSomeDataPresent = isSomeDetailsPresent || isLocationPresent;

  return (
    <View style={cardStyles.container}>
      {/* Header Row */}
      <View style={cardStyles.nameRow}>
        <AppText style={cardStyles.name} numberOfLines={1} typography="bold_14">
          {event?.title}
        </AppText>
        {headerRight}
      </View>

      <If condition={isSomeDataPresent}>
        <DashedLine strokeDasharray="3 3" />
      </If>

      {/* Info Section */}
      <If condition={isSomeDetailsPresent}>
        <View style={cardStyles.infoContainer}>
          <Image style={cardStyles.image} />
          <View style={cardStyles.infoContent}>
            <If condition={isSomeDetailsPresent}>
              <View style={cardStyles.row}>
                <If condition={!!startAt}>
                  <IconText
                    icon={ICONS.calendarV2('main')}
                    text={startAt}
                    iconSize={14}
                    textProps={{
                      typography: 'medium_12',
                      color: 'gray_primary',
                    }}
                  />
                </If>

                <If condition={!!eventDuration.formatted}>
                  <IconText
                    icon={ICONS.clockV2('main')}
                    text={eventDuration.formatted}
                    iconSize={14}
                    textProps={{
                      typography: 'medium_12',
                      color: 'gray_primary',
                    }}
                  />
                </If>
                <If condition={!!peoplesCount}>
                  <IconText
                    icon={ICONS.usersRound('main')}
                    text={peoplesCount || 0}
                    iconSize={14}
                    textProps={{
                      typography: 'medium_12',
                      color: 'gray_primary',
                    }}
                  />
                </If>
              </View>
            </If>

            <If condition={isLocationPresent}>
              <IconText
                icon={ICONS.locationPin('main')}
                text={event?.event_location?.formatted_address || 'No location'}
                textProps={{
                  numberOfLines: 1,
                  color: 'gray_primary',
                  typography: 'medium_12',
                }}
                iconSize={14}
              />
            </If>
          </View>
        </View>
      </If>
      {/* <If condition={!!footer}> */}
      <DashedLine strokeDasharray="3 3" />
      {/* </If> */}

      {/* Footer */}
      {footer}
    </View>
  );
};
