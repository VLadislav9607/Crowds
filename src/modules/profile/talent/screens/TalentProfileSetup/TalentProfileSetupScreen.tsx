import { ScreenWithScrollWrapper } from '@components';
import {
  AnimatedProfileSetupHeader,
  AnimatedProfileSetupHeaderRef,
} from '../../../components';
import { TalentProfileSetupForm } from '../../forms';
import { styles } from './styles';
import { View } from 'react-native';
import { useState } from 'react';

export const TalentProfileSetupScreen = () => {
  const [scrollHandler, setScrollHandler] =
    useState<AnimatedProfileSetupHeaderRef['scrollHandler']>();

  return (
    <ScreenWithScrollWrapper
      title="Setup My Profile"
      headerVariant="withTitle"
      contentContainerStyle={styles.contentContainer}
      headerStyles={styles.headerStyles}
      useAnimatedScrollView={true}
      animatedScrollHandler={scrollHandler}
      customElement={
        <AnimatedProfileSetupHeader
          ref={ref => setScrollHandler(ref?.scrollHandler)}
        />
      }
    >
      <View style={styles.contentWrapper}>
        <TalentProfileSetupForm />
      </View>
    </ScreenWithScrollWrapper>
  );
};
