import { TouchableOpacity, View } from 'react-native';

import { AppText } from '@ui';

import { IGridBoardProps } from './types';
import { styles } from './styles';
import { If, Skeleton } from '@components';

export const GridBoard = ({
  items,
  counterProps,
  containerStyle,
}: IGridBoardProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
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
            <View style={styles.skeletonContainer}>
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
              renderIf={typeof event.count === 'number'}
              typography="bold_30"
              {...counterProps}
              style={[
                styles.eventItemCount,
                counterProps?.style,
                { color: event.textColor },
              ]}
            >
              {event.count}
            </AppText>

            <If condition={!!event.countElement}>{event.countElement}</If>

            <AppText renderIf={!!event.label} style={styles.label}>
              {event.label}
            </AppText>
            <If condition={!!event.labelElement}>{event.labelElement}</If>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
