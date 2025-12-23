import { ScreenWithScrollWrapper } from '@components';
import { ProfileSetupHeader } from '../../../components';
import { TalentProfileSetupForm } from '../../forms';
import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { styles } from './styles';
import { View } from 'react-native';

export const TalentProfileSetupScreen = () => {
  const headerOpacity = useSharedValue(1);
  const headerTranslateY = useSharedValue(0);
  const headerHeight = useSharedValue(120);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const ANIMATION_START_LIMIT = 20;
      const ANIMATION_END_LIMIT = 40;
      const currentScrollY = event.contentOffset.y;

      if (currentScrollY <= ANIMATION_START_LIMIT) {
        //first 20px - header stays in place
        headerTranslateY.value = 0;
        headerOpacity.value = 1;
        headerHeight.value = 120;
      } else if (currentScrollY <= ANIMATION_END_LIMIT) {
        //next 20px (20-40) - gradual disappearance and movement up
        headerHeight.value = 120;

        const scrollProgress = currentScrollY - ANIMATION_START_LIMIT;
        headerTranslateY.value = -scrollProgress;
        headerOpacity.value =
          1 - scrollProgress / (ANIMATION_END_LIMIT - ANIMATION_START_LIMIT);
        // const heightProgress = scrollProgress / (ANIMATION_END_LIMIT - ANIMATION_START_LIMIT);
        // headerHeight.value = 120 * (1 - heightProgress);
      } else {
        //after 40px - fully hidden
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
      title="Setup My Profile"
      headerVariant="withTitle"
      contentContainerStyle={styles.contentContainer}
      headerStyles={styles.headerStyles}
      animatedScrollHandler={scrollHandler}
      useAnimatedScrollView={true}
      customElement={
        <Animated.View style={[styles.headerContainer, animatedHeaderStyle]}>
          <ProfileSetupHeader
            showCircleBadge
            showUnverifiedBadge
            showCamera
            showCnBadge
          />
        </Animated.View>
      }
    >
      <View style={styles.contentWrapper}>
        <TalentProfileSetupForm />
      </View>
    </ScreenWithScrollWrapper>
  );
};
