import { ScreenWithScrollWrapper } from '@components';
import { ForgotPasswordForm, ForgotPasswordFormRef } from '../../forms';
import { COLORS } from '@styles';
import { AppButton, AppText } from '@ui';
import { styles } from './styles';
import { View } from 'react-native';
import { useEffect, useRef } from 'react';
import { useBoolean } from '@hooks';

export const ForgotPasswordScreen = () => {
  const forgotPasswordFormRef = useRef<ForgotPasswordFormRef>(null);
  const { value: isResettingPassword, setValue: setIsResettingPassword } =
    useBoolean(false);

  const handleResetPassword = () => {
    forgotPasswordFormRef.current?.handleSubmit();
  };

  useEffect(() => {
    setIsResettingPassword(isResettingPassword);
  }, [isResettingPassword, setIsResettingPassword]);

  return (
    <ScreenWithScrollWrapper
      showLoader={isResettingPassword}
      headerVariant="withLogo"
      headerStyles={{ backgroundColor: COLORS.black }}
    >
      <View style={styles.container}>
        <AppText typography="bold_20" style={styles.title}>
          Reset password
        </AppText>
        <ForgotPasswordForm
          ref={forgotPasswordFormRef}
          onFormStateChange={value => setIsResettingPassword(value.isLoading)}
        />
        <AppButton
          title="Reset password"
          onPress={handleResetPassword}
          wrapperStyles={styles.resetPasswordButton}
        />
      </View>
    </ScreenWithScrollWrapper>
  );
};
