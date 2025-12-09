import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppText } from '@ui';
import { COLORS, TYPOGRAPHY } from '@styles';

import { IGridBoardProps } from './types';

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

const GAP = 10;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    marginBottom: 24,
  },
  eventItem: {
    width: `${(100 - GAP / 2) / 2}%` as any,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  eventItemSubTitle: {
    ...TYPOGRAPHY.regular_9,
    color: COLORS.black_50,
    marginTop: 2,
  },
  eventItemTitle: {
    ...TYPOGRAPHY.medium_13,
  },
  eventItemCount: {
    ...TYPOGRAPHY.bold_30,
    marginTop: 'auto',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  label: {
    ...TYPOGRAPHY.medium_10,
    textTransform: 'uppercase',
  },
});
