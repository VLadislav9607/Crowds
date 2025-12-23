import { ScreenWithScrollWrapper } from '@components';
import { SignInForm, SignInFormRef } from '../../forms';
import { COLORS } from '@styles';
import { AppButton, AppText } from '@ui';
import { styles } from './styles';
import { Alert, TouchableOpacity, View } from 'react-native';
import { useRef } from 'react';
import { Screens } from '@navigation';
import { goToScreen } from '@navigation';
import { useBoolean } from '@hooks';

export const SignInScreen = () => {
  const signInFormRef = useRef<SignInFormRef>(null);

  const { value: isLoggingIn, setValue: setIsLoggingIn } = useBoolean(false);

  const handleSignIn = () => {
    signInFormRef.current?.handleSubmit();
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
        <SignInForm
          ref={signInFormRef}
          onFormStateChange={value => setIsLoggingIn(value.isLoggingIn)}
        />

        <TouchableOpacity

          style={styles.forgotPassword}
          onPress={handleForgotPassword}
        >
          <AppText typography="regular_14" style={styles.forgotPasswordText}>
            Forgot password?
          </AppText>
        </TouchableOpacity>

        <AppButton isLoading={isLoggingIn} title="Sign in" onPress={handleSignIn} />
      </View>
    </ScreenWithScrollWrapper>
  );
};
