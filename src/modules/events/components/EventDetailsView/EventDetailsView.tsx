import { AppText, IconText } from '@ui';
import { Image, Linking, TouchableOpacity, View } from 'react-native';
import {
  EventDetailsCardWithMapProps,
  EventDetailsCardWithoutMapProps,
  EventDetailsTextBlockProps,
  EventDetailsRequirementsProps,
  EventDetailsTagsProps,
} from './types';
import { If, Skeleton } from '@components';
import { ICONS } from '@assets';
import { styles } from './styles';
import { GOOGLE_PLACES_API_KEY } from '@env';

export const EventDetailsCardWithMap = ({
  showSkeleton = false,
  containerStyle,
  location,
  startAtFormatted,
  duration,
}: EventDetailsCardWithMapProps) => {
  if (showSkeleton)
    return (
      <View style={containerStyle}>
        <Skeleton>
          <Skeleton.Item width={'100%'} height={275} borderRadius={10} />
        </Skeleton>
      </View>
    );

  return (
    <View style={[styles.cardWithMapContainer, containerStyle]}>
      <AppText typography="bold_16" margin={{ bottom: 8 }}>
        EVENT DETAILS
      </AppText>

      <View style={styles.divider} />

      <View style={styles.cardWithMapIconsRow}>
        <IconText
          gap={6}
          icon={ICONS.calendarIcon('main')}
          text={startAtFormatted ?? ''}
          iconSize={22}
          textProps={{ typography: 'medium_12', color: 'black_60' }}
        />

        <IconText
          icon={ICONS.clockIcon('main')}
          text={duration ?? ''}
          iconSize={20}
          gap={6}
          textProps={{ typography: 'medium_12', color: 'black_60' }}
        />
        {/* <IconText
            icon={ICONS.locationPin('main')}
            text="23 Km"
            iconSize={22}
            gap={6}
            textProps={{ typography: 'medium_12', color: 'black_60' }}
          /> */}
      </View>

      <IconText
        gap={6}
        icon={ICONS.locationMap('main')}
        text={location?.formatted_address ?? ''}
        iconSize={22}
        textProps={{
          typography: 'medium_12',
          color: 'black_60',
          style: styles.flex1,
        }}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          Linking.openURL(
            `https://maps.google.com/maps?q=${location?.latitude},${location?.longitude}`,
          );
        }}
      >
        <Image
          style={styles.mapImage}
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${location?.latitude},${location?.longitude}&zoom=14&size=1200x720&scale=2&markers=color:0x1A9F9C%7Csize:medium%7C${location?.latitude},${location?.longitude}&maptype=roadmap&style=feature:poi.business%7Cvisibility:on&style=feature:poi.medical%7Cvisibility:on&style=feature:road%7Celement:geometry%7Ccolor:0xffffff&style=feature:water%7Celement:geometry%7Ccolor:0x1A9F9C&key=${GOOGLE_PLACES_API_KEY}`}
        />
      </TouchableOpacity>
    </View>
  );
};

export const EventDetailsCardWithoutMap = ({
  showSkeleton = false,
  containerStyle,
}: EventDetailsCardWithoutMapProps) => {
  if (showSkeleton)
    return (
      <View style={containerStyle}>
        <Skeleton>
          <Skeleton.Item width={'100%'} height={137} borderRadius={10} />
        </Skeleton>
      </View>
    );

  return (
    <View style={[styles.cardWithoutMapContainer, containerStyle]}>
      <AppText typography="bold_16" margin={{ bottom: 8 }}>
        EVENT DETAILS
      </AppText>

      <View style={styles.divider} />

      <View style={styles.cardWithoutMapContent}>
        <IconText
          gap={6}
          icon={ICONS.calendarIcon('main')}
          text="03 OCT, 2025"
          iconSize={22}
          textProps={{ typography: 'medium_12', color: 'black_60' }}
        />
        <IconText
          gap={6}
          icon={ICONS.locationMap('main')}
          text="333 Bridge Road, Richmond VIC Australia, Richmond VIC Australia"
          iconSize={22}
          textProps={{
            typography: 'medium_12',
            color: 'black_60',
            style: styles.flex1,
          }}
        />
        <View style={styles.rowContainerWithMargin}>
          <IconText
            gap={6}
            style={styles.flex1}
            icon={ICONS.clockIcon('main')}
            text="03:15 PM"
            iconSize={20}
            textProps={{ typography: 'medium_12', color: 'black_60' }}
          />
          <IconText
            gap={6}
            style={styles.flex1}
            icon={ICONS.clockIcon('main')}
            text="8:30 PM"
            iconSize={20}
            textProps={{ typography: 'medium_12', color: 'black_60' }}
          />
        </View>
      </View>
    </View>
  );
};

export const EventDetailsTextBlock = ({
  text,
  containerStyle,
  showSkeleton = false,
  label,
}: EventDetailsTextBlockProps) => {
  if (!showSkeleton && !text) return null;

  return (
    <View style={containerStyle}>
      <If condition={showSkeleton}>
        <Skeleton>
          <Skeleton.Item
            width={100}
            height={21}
            borderRadius={4}
            marginBottom={10}
          />

          <Skeleton.Item
            width={'100%'}
            height={14}
            borderRadius={4}
            marginBottom={2}
          />
          <Skeleton.Item
            width={'100%'}
            height={14}
            borderRadius={4}
            marginBottom={2}
          />
          <Skeleton.Item
            width={'100%'}
            height={14}
            borderRadius={4}
            marginBottom={2}
          />
          <Skeleton.Item
            width={'100%'}
            height={14}
            borderRadius={4}
            marginBottom={2}
          />
        </Skeleton>
      </If>

      <If condition={!showSkeleton}>
        <AppText typography="semibold_16" margin={{ bottom: 8 }}>
          {label}
        </AppText>
        <AppText typography="regular_14">{text}</AppText>
      </If>
    </View>
  );
};

export const EventDetailsRequirements = ({
  showSkeleton = false,
  containerStyle,
  requirements,
}: EventDetailsRequirementsProps) => {
  if (!showSkeleton && !requirements?.length) return null;

  if (showSkeleton)
    return (
      <View style={containerStyle}>
        <Skeleton>
          <Skeleton.Item
            width={100}
            height={21}
            borderRadius={4}
            marginBottom={6}
          />

          <Skeleton.Item
            width={150}
            height={16}
            borderRadius={4}
            marginBottom={6}
          />
          <Skeleton.Item
            width={150}
            height={16}
            borderRadius={4}
            marginBottom={6}
          />
          <Skeleton.Item
            width={150}
            height={16}
            borderRadius={4}
            marginBottom={6}
          />

          <Skeleton.Item
            width={100}
            height={21}
            borderRadius={4}
            marginBottom={6}
            marginTop={24}
          />

          <Skeleton.Item
            width={150}
            height={16}
            borderRadius={4}
            marginBottom={6}
          />
          <Skeleton.Item
            width={150}
            height={16}
            borderRadius={4}
            marginBottom={6}
          />
          <Skeleton.Item
            width={150}
            height={16}
            borderRadius={4}
            marginBottom={6}
          />
        </Skeleton>
      </View>
    );

  return (
    <View style={[styles.requirementsContainer, containerStyle]}>
      {requirements?.map(requirement => (
        <View key={requirement.title}>
          <AppText typography="semibold_16" margin={{ bottom: 6 }}>
            {requirement.title}
          </AppText>
          <View style={styles.requirementsItems}>
            {requirement.options.map(option => (
              <AppText key={option} typography="regular_14">
                • {option}
              </AppText>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export const EventDetailsTags = ({
  showSkeleton = false,
  containerStyle,
  tags,
}: EventDetailsTagsProps) => {
  if (!showSkeleton && !tags?.length) return null;

  if (showSkeleton)
    return (
      <View style={containerStyle}>
        <Skeleton>
          <Skeleton.Item
            width={70}
            height={21}
            borderRadius={4}
            marginBottom={14}
          />

          <Skeleton.Item style={styles.tagsContainerSkeleton}>
            <Skeleton.Item width={100} height={30} borderRadius={100} />
            <Skeleton.Item width={80} height={30} borderRadius={100} />
            <Skeleton.Item width={80} height={30} borderRadius={92} />
          </Skeleton.Item>
        </Skeleton>
      </View>
    );

  return (
    <View style={containerStyle}>
      <AppText typography="semibold_16" margin={{ bottom: 14 }}>
        Event Tags
      </AppText>

      <View style={styles.tagsContainer}>
        {tags?.map(tag => (
          <View key={tag} style={styles.tagItem}>
            <AppText typography="medium_12" color="main">
              {tag}
            </AppText>
          </View>
        ))}
      </View>
    </View>
  );
};
