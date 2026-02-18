import { TouchableOpacity, View } from 'react-native';
import { ReactNode } from 'react';
import { IconText, AppText, DashedLine } from '@ui';
import { ICONS } from '@assets';
import { cardStyles } from './styles';
import { OrgEventListItemDto, useGetMe } from '@actions';
import { formatInTimeZone } from 'date-fns-tz';
import { AppImage, If } from '@components';
import { calculateEventDuration } from '../../../helpers';
import { ActionConfirmationModalRef } from '@modules/common';
import { getCountryNameByCode } from '@helpers';
import { goToScreen, Screens } from '@navigation';

export interface IOrgBaseEventCardProps {
  event?: OrgEventListItemDto;
  headerRight?: ReactNode;
  footer?: ReactNode;
  actionConfirmationModalRef?: React.RefObject<ActionConfirmationModalRef | null>;
}

export const OrgBaseEventCard = ({
  event,
  headerRight,
  footer,
}: IOrgBaseEventCardProps) => {
  const onPress = () => {
    goToScreen(Screens.OrgEventDetails, { eventId: event?.id ?? '' });
  };
  const timezone = event?.event_location?.timezone || 'UTC';
  const { organizationMember } = useGetMe();

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

  const officeCountryName = event?.office_country_code
    ? getCountryNameByCode(event.office_country_code)
    : undefined;

  const isSomeDetailsPresent =
    !!startAt || !!eventDuration.formatted || !!peoplesCount;
  const isLocationPresent =
    !!event?.event_location?.formatted_address || !!officeCountryName;

  const isSomeDataPresent = isSomeDetailsPresent || isLocationPresent;

  const isDraft = event?.status === 'draft';
  return (
    <TouchableOpacity
      activeOpacity={isDraft ? 1 : 0.8}
      style={cardStyles.container}
      onPress={isDraft ? undefined : onPress}
    >
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
      <If condition={isSomeDataPresent}>
        <View style={cardStyles.infoContainer}>
          <If
            condition={!!organizationMember?.current_context?.brand?.logo_path}
          >
            <AppImage
              imgPath={organizationMember?.current_context?.brand?.logo_path}
              bucket="brand_avatars"
              containerStyle={cardStyles.image}
            />
          </If>
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
                text={
                  event?.event_location?.formatted_address ||
                  officeCountryName ||
                  ''
                }
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
    </TouchableOpacity>
  );
};
