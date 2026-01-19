import { useRef, useState } from 'react';
import { View } from 'react-native';
import { ScreenWithScrollWrapper } from '@components';
import { AppButton } from '@ui';
import { useNavigation } from '@react-navigation/native';
import {
  AnimatedProfileSetupHeader,
  AnimatedProfileSetupHeaderRef,
} from '../../../components';
import { TalentProfileSetupForm, TalentProfileSetupFormRef } from '../../forms';
import { styles } from './styles';
import { queryClient } from '@services';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const TalentProfileSetupScreen = () => {
  const navigation = useNavigation();
  const formRef = useRef<TalentProfileSetupFormRef>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [scrollHandler, setScrollHandler] =
    useState<AnimatedProfileSetupHeaderRef['scrollHandler']>();

  const handleSubmit = () => {
    formRef.current?.onSubmit();
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: [TANSTACK_QUERY_KEYS.SEARCH_PUBLIC_EVENTS],
    });
    navigation.goBack();
  };

  return (
    <ScreenWithScrollWrapper
      title="Setup My Profile"
      headerVariant="withTitle"
      contentContainerStyle={styles.contentContainer}
      headerStyles={styles.headerStyles}
      useAnimatedScrollView={true}
      showLoader={isUpdating}
      animatedScrollHandler={scrollHandler}
      customElement={
        <AnimatedProfileSetupHeader
          ref={ref => setScrollHandler(ref?.scrollHandler)}
        />
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
