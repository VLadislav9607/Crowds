import { TouchableOpacity, View } from 'react-native';

import { AppText } from '@ui';

import { IGridBoardProps } from './types';
import { styles } from './styles';

export const GridBoard = ({ items }: IGridBoardProps) => {
  return (
    <View style={styles.container}>
      {/* eslint-disable react-native/no-inline-styles */}
      {items.map((event, index) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          disabled={!event.onPress}
          onPress={event.onPress}
          style={[
            styles.eventItem,
            {
              backgroundColor: event.bgColor,
              height: event.subTitle ? 116 : 93,
            },
          ]}
        >
          <AppText
            style={[
              styles.eventItemTitle,
              { marginBottom: event.subTitle ? 2 : 12 },
            ]}
          >
            {event.title}
          </AppText>

          {event.subTitle && (
            <AppText style={styles.eventItemSubTitle}>{event.subTitle}</AppText>
          )}

          <View style={styles.row}>
            <AppText
              style={[styles.eventItemCount, { color: event.textColor }]}
            >
              {event.count}
            </AppText>

            <AppText style={styles.label}>{event.label}</AppText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
