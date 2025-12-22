import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { View } from "react-native";
import { AppButton, AppText, OtpInput } from "@ui";
import { OtpVerificationFormProps, OtpVerificationFormRef } from "./types";

const COUNTDOWN_DURATION = 60; // 1 minute in seconds

export const OtpVerificationForm = forwardRef<OtpVerificationFormRef, OtpVerificationFormProps>(({ email = '', onSubmit , onComplete, onResendButtonPress }, ref) => {
  const [countdown, setCountdown] = useState(COUNTDOWN_DURATION);
  const [value, setValue] = useState('');

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResend = () => {
    setCountdown(COUNTDOWN_DURATION);
    // Add your resend logic here
    onResendButtonPress?.();
  };

  const isDisabled = countdown > 0;
  const buttonTitle = isDisabled
    ? `Resend code in ${formatTime(countdown)}`
    : "Resend code";

  useImperativeHandle(ref, () => ({
    getCode: () => value
  }), [value]);

  useEffect(() => {
    if (countdown === 0) {
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <View>
      <AppText typography='regular_14'>Please enter the verification code sent to <AppText typography='semibold_14'>{email.toLowerCase()}</AppText></AppText>
      <OtpInput
        autofocus
        containerStyle={{ marginVertical: 36 }}
        value={value}
        onComplete={onComplete}
        onSubmit={onSubmit}
        onChange={setValue}
      />
      <AppButton
        title={buttonTitle}
        onPress={handleResend}
        isDisabled={isDisabled}
        size='36'

        wrapperStyles={{ width: 182, paddingHorizontal: 0 }}
      />
    </View>
  );
});