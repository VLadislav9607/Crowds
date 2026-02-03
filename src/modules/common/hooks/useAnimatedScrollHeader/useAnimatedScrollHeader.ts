import {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';

const ANIMATION_START_LIMIT = 20;
const ANIMATION_END_LIMIT = 40;
const HEADER_HEIGHT = 120;

export const useAnimatedScrollHeader = () => {
  const headerOpacity = useSharedValue(1);
  const headerTranslateY = useSharedValue(0);
  const headerHeight = useSharedValue(HEADER_HEIGHT);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      const currentScrollY = event.contentOffset.y;

      if (currentScrollY <= ANIMATION_START_LIMIT) {
        headerTranslateY.value = 0;
        headerOpacity.value = 1;
        headerHeight.value = HEADER_HEIGHT;
      } else if (currentScrollY <= ANIMATION_END_LIMIT) {
        headerHeight.value = HEADER_HEIGHT;

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

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
    height: headerHeight.value,
  }));

  return { scrollHandler, animatedHeaderStyle };
};
