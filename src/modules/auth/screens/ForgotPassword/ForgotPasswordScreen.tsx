import { ScreenWithScrollWrapper } from '@components';
import { ForgotPasswordForm, ForgotPasswordFormRef } from '../../forms';
import { COLORS } from '@styles';
import { AppButton, AppText } from '@ui';
import { styles } from './styles';
import { View } from 'react-native';
import { useRef } from 'react';

export const ForgotPasswordScreen = () => {
  const forgotPasswordFormRef = useRef<ForgotPasswordFormRef>(null);

  const handleResetPassword = () => {
    forgotPasswordFormRef.current?.handleSubmit(formData => {
      console.log('Form data:', formData);
    })();
  };

  return (
    <ScreenWithScrollWrapper
      headerVariant="withLogo"
      headerStyles={{ backgroundColor: COLORS.black }}
    >
      <View style={styles.container}>
        <AppText typography="bold_20" style={styles.title}>
          Reset password
        </AppText>
        <ForgotPasswordForm ref={forgotPasswordFormRef} />
        <AppButton
          title="Reset password"
          onPress={handleResetPassword}
          wrapperStyles={styles.resetPasswordButton}
        />
      </View>
    </ScreenWithScrollWrapper>
  );
};
