import { ScreenWithScrollWrapper } from "@components";
import { ChangePasswordForm, ChangePasswordFormRef } from "../../forms";
import { useRef } from "react";
import { AppButton } from "@ui";
import { styles } from "./styles";

export const ChangePasswordScreen = () => {
  const changePasswordFormRef = useRef<ChangePasswordFormRef>(null);

  return (
    <ScreenWithScrollWrapper
      headerVariant='withTitle'
      title="Change Password"
      headerStyles={styles.headerStyles}
      footer={
        <AppButton
          title="Change Password"
          wrapperStyles={styles.changePasswordButton}
          onPress={() => {
            changePasswordFormRef.current?.handleSubmit(formData => {
              console.log('Form data:', formData);
            })();
          }}
        />
      }
    >

      <ChangePasswordForm
        ref={changePasswordFormRef}
        containerStyle={styles.formContainer}
      />

    </ScreenWithScrollWrapper>
  );
};

ChangePasswordScreen.displayName = 'ChangePasswordScreen';