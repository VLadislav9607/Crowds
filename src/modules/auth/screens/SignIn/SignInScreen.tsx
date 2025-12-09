import { ScreenWithScrollWrapper } from '@components';
import { SignInForm, SignInFormRef } from '../../forms';
import { COLORS } from '@styles';
import { AppButton, AppText } from '@ui';
import { styles } from './styles';
import { TouchableOpacity, View } from 'react-native';
import { useRef } from 'react';
import { Screens } from '@navigation';
import { goToScreen } from '@navigation';

export const SignInScreen = () => {
  const signInFormRef = useRef<SignInFormRef>(null);

  const handleSignIn = () => {
    signInFormRef.current?.handleSubmit(formData => {
      console.log('Form data:', formData);
    })();
  };

  const handleForgotPassword = () => {
    goToScreen(Screens.ForgotPassword);
  };

  return (
    <ScreenWithScrollWrapper
      headerVariant="withLogo"
      headerStyles={{ backgroundColor: COLORS.black }}
    >
      <View style={styles.container}>
        <AppText typography="bold_20" style={styles.title}>
          Sign in
        </AppText>
        <SignInForm ref={signInFormRef} />
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={handleForgotPassword}
        >
          <AppText typography="regular_14" style={styles.forgotPasswordText}>
            Forgot password?
          </AppText>
        </TouchableOpacity>

        <AppButton title="Sign in" onPress={handleSignIn} />
      </View>
    </ScreenWithScrollWrapper>
  );
};
