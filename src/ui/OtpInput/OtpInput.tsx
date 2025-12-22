import { useRef, useState, useEffect } from 'react';
import { TextInput, View } from 'react-native';
import { COLORS } from '@styles';
import { AppText } from '../AppText';
import { OtpInputProps } from './types';
import { styles } from './styles';

const OTP_LENGTH = 6;

export const OtpInput = ({
  label,
  errorMessage,
  containerStyle,
  labelProps,
  errorMessageProps,
  disabled = false,
  value = '',
  onChange,
  onComplete,
  onSubmit,
  autofocus = false,
}: OtpInputProps) => {
  const initializeOtp = (val: string): string[] => {
    const digits = val.split('').slice(0, OTP_LENGTH);
    return [...digits, ...Array(OTP_LENGTH - digits.length).fill('')];
  };

  const [otp, setOtp] = useState<string[]>(initializeOtp(value));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const currentValue = otp.join('');
    if (value !== currentValue) {
      setOtp(initializeOtp(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (autofocus && !disabled && inputRefs.current[0]) {
      // Small delay to ensure the component is fully mounted
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autofocus, disabled]);

  const handleChange = (text: string, index: number) => {
    if (disabled) return;

    // Only allow digits
    const digit = text.replace(/[^0-9]/g, '');
    
    if (digit.length > 1) {
      // Handle paste
      const digits = digit.slice(0, OTP_LENGTH - index).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (index + i < OTP_LENGTH) {
          newOtp[index + i] = d;
        }
      });
      setOtp(newOtp);
      
      const otpValue = newOtp.join('');
      onChange?.(otpValue);
      
      // Focus next empty cell or last cell
      const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      
      if (otpValue.length === OTP_LENGTH) {
        onComplete?.(otpValue);
      }
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    const otpValue = newOtp.join('');
    onChange?.(otpValue);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (otpValue.length === OTP_LENGTH) {
      onComplete?.(otpValue);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      // If current field is empty, clear previous field and move focus
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      
      const otpValue = newOtp.join('');
      onChange?.(otpValue);
      
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmitEditing = (index: number) => {
    const otpValue = otp.join('');
    if (otpValue.length === OTP_LENGTH) {
      onSubmit?.(otpValue);
    }
    // Blur the input when submit is pressed
    inputRefs.current[index]?.blur();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <AppText
          color={disabled ? 'black_40' : 'black_50'}
          typography="medium_14"
          {...labelProps}
          style={[styles.label, labelProps?.style]}
        >
          {label}
        </AppText>
      )}

      <View style={styles.cellsContainer}>
        {Array.from({ length: OTP_LENGTH }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.cellWrapper,
              disabled && styles.disabledCellWrapper,
            ]}
          >
            <TextInput
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={styles.cell}
              value={otp[index]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onSubmitEditing={() => handleSubmitEditing(index)}
              returnKeyType={index === OTP_LENGTH - 1 ? 'done' : 'next'}
              keyboardType={index === OTP_LENGTH - 1 ? 'numeric' : 'number-pad'}
              maxLength={1}
              editable={!disabled}
              placeholderTextColor={disabled ? COLORS.black_20 : COLORS.black_40}
              selectTextOnFocus
              caretHidden={false}
              selectionColor={COLORS.main}
            />
          </View>
        ))}
      </View>

      {errorMessage && (
        <AppText
          typography="medium_10"
          color="red"
          {...errorMessageProps}
          style={[styles.errorMessage, errorMessageProps?.style]}
        >
          {errorMessage}
        </AppText>
      )}
    </View>
  );
};
