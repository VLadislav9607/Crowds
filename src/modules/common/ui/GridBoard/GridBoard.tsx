import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { AppText } from '@ui';
import { TYPOGRAPHY } from '@styles';

interface IGridBoardProps {
  items: {
    label: string;
    count: number;
    bgColor: string;
    textColor: string;
    onPress: () => void;
  }[];
}

export const GridBoard = ({ items }: IGridBoardProps) => {
  return (
    <View style={styles.container}>
      {items.map((event, index) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          onPress={event.onPress}
          style={[styles.eventItem, { backgroundColor: event.bgColor }]}
        >
          <AppText style={[styles.eventItemLabel, { color: event.textColor }]}>
            {event.label}
          </AppText>
          <AppText style={[styles.eventItemCount, { color: event.textColor }]}>
            {event.count}
          </AppText>

          <AppText style={styles.view}>View</AppText>
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
  eventItemLabel: {
    ...TYPOGRAPHY.medium_13,
    marginBottom: 12,
  },
  eventItemCount: {
    ...TYPOGRAPHY.bold_30,
  },
  view: {
    ...TYPOGRAPHY.medium_10,
    position: 'absolute',
    bottom: 16,
    right: 20,
    textTransform: 'uppercase',
  },
});
