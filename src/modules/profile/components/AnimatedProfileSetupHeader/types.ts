import { useAnimatedScrollHandler } from 'react-native-reanimated';

export interface AnimatedProfileSetupHeaderRef {
  scrollHandler: ReturnType<typeof useAnimatedScrollHandler>;
  showCamera?: boolean;
}
