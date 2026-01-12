import { TouchableOpacity, View } from 'react-native';

import { AppText } from '@ui';

import { IGridBoardProps } from './types';
import { styles } from './styles';
import { Skeleton } from '@components';

export const GridBoard = ({ items }: IGridBoardProps) => {
  return (
    <View style={styles.container}>
      {/* eslint-disable react-native/no-inline-styles */}
      {items.map((event, index) => (
        <TouchableOpacity
          activeOpacity={0.8}
          key={index}
          disabled={!event.onPress || event.showSkeleton}
          onPress={event.onPress}
          style={[
            styles.eventItem,
            {
              backgroundColor: event.bgColor,
              height: event.subTitle ? 116 : 93,
            },
          ]}
        >
          {event.showSkeleton && (
            <View
              style={{
                backgroundColor: 'white',
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
              }}
            >
              <Skeleton>
                <Skeleton.Item width={'100%'} height={'100%'} />
              </Skeleton>
            </View>
          )}

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
