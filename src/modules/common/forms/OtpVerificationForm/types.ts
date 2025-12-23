
export interface OtpVerificationFormProps {
  email?: string;
  onSubmit?: (code: string) => void;
  onComplete?: (code: string) => void;
  onResendButtonPress?: () => void;
}

export interface OtpVerificationFormRef {
  getCode: () => string;
}