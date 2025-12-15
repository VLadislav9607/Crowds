import { AppText, IconText } from "@ui";
import { Image, View } from "react-native";
import { EventDetailsCardWithMapProps, EventDetailsCardWithoutMapProps, EventDetailsTextBlockProps, EventDetailsRequirementsProps, EventDetailsTagsProps } from "./types";
import { If, Skeleton } from "@components";
import { ICONS } from "@assets";
import { styles } from "./styles";

export const EventDetailsCardWithMap = ({ showSkeleton = false, containerStyle }: EventDetailsCardWithMapProps) => {

  if (showSkeleton) return (
    <View style={containerStyle}>
      <Skeleton>
        <Skeleton.Item width={'100%'} height={275} borderRadius={10} />
      </Skeleton>
    </View>
  );

  return (
    <View style={[styles.cardWithMapContainer, containerStyle]}>
      <AppText typography="bold_16" margin={{ bottom: 8 }}>EVENT DETAILS</AppText>

      <View style={styles.divider} />

      <View style={styles.cardWithMapIconsRow}>

        <IconText gap={6} icon={ICONS.calendarIcon('main')} text="03 OCT, 2025" iconSize={22} textProps={{ typography: 'medium_12', color: 'black_60' }} />

        <View style={styles.cardWithMapLastIconsRow}>
          <IconText
            icon={ICONS.clockIcon('main')}
            text="3 Hours" iconSize={20}
            gap={6}
            textProps={{ typography: 'medium_12', color: 'black_60' }}
            style={styles.flex1}
          />
          <IconText
            icon={ICONS.locationPin('main')}
            text="23 Km"
            iconSize={22}
            gap={6}
            textProps={{ typography: 'medium_12', color: 'black_60' }}
            style={styles.flex1}
          />
        </View>


      </View>

      <IconText gap={6} icon={ICONS.locationMap('main')} text="333 Bridge Road, Richmond VIC Australia, Richmond VIC Australia" iconSize={22} textProps={{ typography: 'medium_12', color: 'black_60', style: styles.flex1 }} />

      <Image style={styles.mapImage} />
    </View>
  );
};

export const EventDetailsCardWithoutMap = ({ showSkeleton = false, containerStyle }: EventDetailsCardWithoutMapProps) => {

  if (showSkeleton) return (
    <View style={containerStyle}>
      <Skeleton>
        <Skeleton.Item width={'100%'} height={137} borderRadius={10} />
      </Skeleton>
    </View>
  );

  return (
    <View style={[styles.cardWithoutMapContainer, containerStyle]}>
      <AppText typography="bold_16" margin={{ bottom: 8 }}>EVENT DETAILS</AppText>

      <View style={styles.divider} />

      <View style={styles.cardWithoutMapContent}>
        <IconText gap={6} icon={ICONS.calendarIcon('main')} text="03 OCT, 2025" iconSize={22} textProps={{ typography: 'medium_12', color: 'black_60' }} />
        <IconText gap={6} icon={ICONS.locationMap('main')} text="333 Bridge Road, Richmond VIC Australia, Richmond VIC Australia" iconSize={22} textProps={{ typography: 'medium_12', color: 'black_60', style: styles.flex1 }} />
        <View style={styles.rowContainerWithMargin}>
          <IconText gap={6} style={styles.flex1} icon={ICONS.clockIcon('main')} text="03:15 PM" iconSize={20} textProps={{ typography: 'medium_12', color: 'black_60' }} />
          <IconText gap={6} style={styles.flex1} icon={ICONS.clockIcon('main')} text="8:30 PM" iconSize={20} textProps={{ typography: 'medium_12', color: 'black_60' }} />
        </View>
      </View>
    </View>
  );
};

export const EventDetailsTextBlock = ({ text, containerStyle, showSkeleton = false, label }: EventDetailsTextBlockProps) => {

  if (!showSkeleton && !text) return null;

  return (
    <View style={containerStyle}>

      <If condition={showSkeleton}>
        <Skeleton>
          <Skeleton.Item width={100} height={21} borderRadius={4} marginBottom={10} />

          <Skeleton.Item width={'100%'} height={14} borderRadius={4} marginBottom={2} />
          <Skeleton.Item width={'100%'} height={14} borderRadius={4} marginBottom={2} />
          <Skeleton.Item width={'100%'} height={14} borderRadius={4} marginBottom={2} />
          <Skeleton.Item width={'100%'} height={14} borderRadius={4} marginBottom={2} />
        </Skeleton>
      </If>

      <If condition={!showSkeleton}>
        <AppText typography="semibold_16" margin={{ bottom: 8 }}>{label}</AppText>
        <AppText typography="regular_14">
          {text}
        </AppText>
      </If>

    </View>
  );
};


export const EventDetailsRequirements = ({ showSkeleton = false, containerStyle, requirements }: EventDetailsRequirementsProps) => {

  if (!showSkeleton && !requirements?.length) return null;

  if (showSkeleton) return (
    <View style={containerStyle}>
      <Skeleton>
        <Skeleton.Item width={100} height={21} borderRadius={4} marginBottom={6} />

        <Skeleton.Item width={150} height={16} borderRadius={4} marginBottom={6} />
        <Skeleton.Item width={150} height={16} borderRadius={4} marginBottom={6} />
        <Skeleton.Item width={150} height={16} borderRadius={4} marginBottom={6} />

        <Skeleton.Item width={100} height={21} borderRadius={4} marginBottom={6} marginTop={24} />

        <Skeleton.Item width={150} height={16} borderRadius={4} marginBottom={6} />
        <Skeleton.Item width={150} height={16} borderRadius={4} marginBottom={6} />
        <Skeleton.Item width={150} height={16} borderRadius={4} marginBottom={6} />
      </Skeleton>
    </View>
  );

  return (
    <View style={[styles.requirementsContainer, containerStyle]}>
      {requirements?.map((requirement) => (
        <View key={requirement.title}>
          <AppText typography="semibold_16" margin={{ bottom: 6 }}>{requirement.title}</AppText>
          <View style={styles.requirementsItems}>
            {requirement.options.map((option) => (
              <AppText key={option} typography="regular_14">• {option}</AppText>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export const EventDetailsTags = ({ showSkeleton = false, containerStyle, tags }: EventDetailsTagsProps) => {

  if (!showSkeleton && !tags?.length) return null;

  if (showSkeleton) return (
    <View style={containerStyle}>
      <Skeleton>
        <Skeleton.Item width={70} height={21} borderRadius={4} marginBottom={14} />

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
      <AppText typography="semibold_16" margin={{ bottom: 14 }}>Event Tags</AppText>

      <View style={styles.tagsContainer}>
        {tags?.map((tag) => (
          <View key={tag} style={styles.tagItem}>
            <AppText typography="medium_12" color='main'>{tag}</AppText>
          </View>
        ))}
      </View>
    </View>
  );
};