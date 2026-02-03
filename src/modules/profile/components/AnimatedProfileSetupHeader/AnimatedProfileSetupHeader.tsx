import { forwardRef, useImperativeHandle } from 'react';
import Animated from 'react-native-reanimated';
import { useAnimatedScrollHeader } from '@modules/common';
import { ProfileSetupHeader } from '../ProfileSetupHeader';
import { AnimatedProfileSetupHeaderRef } from './types';
import { styles } from './styles';

export const AnimatedProfileSetupHeader =
  forwardRef<AnimatedProfileSetupHeaderRef>((_, ref) => {
    const { scrollHandler, animatedHeaderStyle } = useAnimatedScrollHeader();

    useImperativeHandle(ref, () => ({
      scrollHandler,
    }));

    return (
      <Animated.View style={[styles.headerContainer, animatedHeaderStyle]}>
        <ProfileSetupHeader />
      </Animated.View>
    );
  });
