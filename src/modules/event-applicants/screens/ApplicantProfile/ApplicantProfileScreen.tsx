import { ScreenWithScrollWrapper } from '@components';
import { ProfileSetupHeader } from '../../../profile/components';
import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

import { AppText } from '@ui';

import { styles } from './styles';
import { Image, View } from 'react-native';
import { PhysicalDetailsList, TagsList } from '../../ui';

const PHYSICAL_DETAILS = [
  { label: 'Hair', value: 'Red' },
  { label: 'Hairstyle', value: 'Curly Hair' },
  { label: 'Eyes', value: 'Blue' },
  { label: 'Size', value: 'F (18)' },
  { label: 'Size', value: 'M (L)' },
  { label: 'Height', value: '5\'5" cm' },
  { label: 'Weight', value: '68 kg' },
  { label: 'Facial Attributes', value: 'Birthmark' },
  { label: 'Body Attributes', value: 'Tattoos, Scars' },
  { label: 'Tattoos', value: 'Sleeves, Neck' },
  { label: 'Pregnancy', value: 'Yes, 5 Months' },
  { label: 'Skin Colour', value: 'Warm Beige', color: '#D4A574' },
];

const TAGS = [
  'Acting',
  'Charismatic',
  'Modeling',
  'Singing',
  'Talented',
  'Musical',
];

export const ApplicantProfileScreen = () => {
  const headerOpacity = useSharedValue(1);
  const headerTranslateY = useSharedValue(0);
  const headerHeight = useSharedValue(120);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const ANIMATION_START_LIMIT = 20;
      const ANIMATION_END_LIMIT = 40;
      const currentScrollY = event.contentOffset.y;

      if (currentScrollY <= ANIMATION_START_LIMIT) {
        headerTranslateY.value = 0;
        headerOpacity.value = 1;
        headerHeight.value = 120;
      } else if (currentScrollY <= ANIMATION_END_LIMIT) {
        headerHeight.value = 120;

        const scrollProgress = currentScrollY - ANIMATION_START_LIMIT;
        headerTranslateY.value = -scrollProgress;
        headerOpacity.value =
          1 - scrollProgress / (ANIMATION_END_LIMIT - ANIMATION_START_LIMIT);
      } else {
        headerTranslateY.value = -(ANIMATION_END_LIMIT - ANIMATION_START_LIMIT);
        headerOpacity.value = 0;
        headerHeight.value = 0;
      }
    },
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [{ translateY: headerTranslateY.value }],
      height: headerHeight.value,
    };
  });

  return (
    <ScreenWithScrollWrapper
      title="View Applicant Profile"
      headerVariant="withTitle"
      contentContainerStyle={styles.contentContainer}
      headerStyles={styles.headerStyles}
      animatedScrollHandler={scrollHandler}
      useAnimatedScrollView
      customElement={
        <Animated.View style={[styles.headerContainer, animatedHeaderStyle]}>
          <ProfileSetupHeader showCircleBadge showCnBadge />
        </Animated.View>
      }
    >
      <View>
        <AppText style={styles.label}>Physical Details</AppText>
        <PhysicalDetailsList details={PHYSICAL_DETAILS} />
      </View>

      <View>
        <AppText style={styles.label}>Biography</AppText>

        <AppText style={styles.description}>
          Duis dui eros, maximus mollis sollicitudin sed, rhoncus a diam.
          Aliquam vel eleifend lorem. Ut luctus lacus in scelerisque cursus.
          Vestibulum volutpat mauris a nulla hendrerit malesuada. Nam accumsan
          enim id metus hendrerit scelerisque. Aliquam auctor augue nibh. Nam
          rhoncus maximus dolor, quis porttitor dui dapibus et.
        </AppText>
      </View>

      <View>
        <AppText style={styles.label}>Photo</AppText>

        <Image
          source={{
            uri: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg',
          }}
          style={styles.photo}
        />
      </View>

      <View>
        <AppText style={styles.label}>Tags</AppText>
        <TagsList tags={TAGS} />
      </View>

      <View>
        <AppText style={styles.label}>Previous Experience</AppText>

        <AppText style={styles.description}>
          Duis dui eros, maximus mollis sollicitudin sed, rhoncus a diam.
          Aliquam vel eleifend lorem. Ut luctus lacus in scelerisque cursus.
          Vestibulum volutpat mauris a nulla hendrerit malesuada. Nam accumsan
          enim id metus hendrerit scelerisque. Aliquam auctor augue nibh. Nam
          rhoncus maximus dolor, quis porttitor dui dapibus et.
        </AppText>
      </View>

      <View>
        <AppText style={styles.label}>Availability</AppText>

        <AppText style={styles.availability}>
          ◉ Available for this month
        </AppText>
      </View>
    </ScreenWithScrollWrapper>
  );
};
