import { useRef, useState } from 'react';
import { View } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { ScreenWithScrollWrapper } from '@components';
import { AppButton } from '@ui';
import { useNavigation } from '@react-navigation/native';
import { ProfileSetupHeader } from '../../../components';
import { TalentProfileSetupForm, TalentProfileSetupFormRef } from '../../forms';
import { styles } from './styles';

export const TalentProfileSetupScreen = () => {
  const navigation = useNavigation();
  const formRef = useRef<TalentProfileSetupFormRef>(null);
  const [isUpdating, setIsUpdating] = useState(false);

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

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
    height: headerHeight.value,
  }));

  const handleSubmit = () => {
    formRef.current?.onSubmit();
  };

  const handleSuccess = () => {
    navigation.goBack();
  };

  return (
    <ScreenWithScrollWrapper
      title="Setup My Profile"
      headerVariant="withTitle"
      contentContainerStyle={styles.contentContainer}
      headerStyles={styles.headerStyles}
      animatedScrollHandler={scrollHandler}
      useAnimatedScrollView={true}
      showLoader={isUpdating}
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
        <TalentProfileSetupForm
          ref={formRef}
          onSuccess={handleSuccess}
          onFormStateChange={state => setIsUpdating(state.isUpdating)}
        />

        <AppButton
          title="Save Changes"
          onPress={handleSubmit}
          isDisabled={isUpdating}
          wrapperStyles={styles.submitButton}
        />
      </View>
    </ScreenWithScrollWrapper>
  );
};
