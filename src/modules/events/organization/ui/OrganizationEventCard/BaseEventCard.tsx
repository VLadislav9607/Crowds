import { Image, View } from 'react-native';
import { ReactNode } from 'react';

import { IconText, AppText } from '@ui';
import { ICONS } from '@assets';

import { IEventData } from './types';
import { cardStyles } from './styles';

interface IBaseEventCardProps {
  event: IEventData;
  headerRight?: ReactNode;
  footer?: ReactNode;
}

export const BaseEventCard = ({
  event,
  headerRight,
  footer,
}: IBaseEventCardProps) => {
  return (
    <View style={cardStyles.container}>
      {/* Header Row */}
      <View style={cardStyles.nameRow}>
        <AppText style={cardStyles.name} numberOfLines={1}>
          {event.name}
        </AppText>
        {headerRight}
      </View>

      <View style={cardStyles.dashedLine} />

      {/* Info Section */}
      <View style={cardStyles.infoContainer}>
        <Image source={{ uri: event.image }} style={cardStyles.image} />
        <View style={cardStyles.infoContent}>
          <View style={cardStyles.row}>
            <IconText
              icon={ICONS.calendarV2()}
              text={event.date}
              iconSize={14}
            />
            <IconText
              icon={ICONS.clockV2()}
              text={event.duration}
              iconSize={14}
            />
          </View>
          <IconText
            icon={ICONS.locationMap()}
            text={event.location}
            textProps={{ numberOfLines: 1 }}
            iconSize={14}
          />
        </View>
      </View>

      <View style={cardStyles.dashedLine} />

      {/* Footer */}
      {footer}
    </View>
  );
};
