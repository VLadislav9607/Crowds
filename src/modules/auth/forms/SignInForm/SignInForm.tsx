import { View } from 'react-native';
import { AppInput } from '@ui';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react';
import { styles } from './styles';
import {
  SignInFormData,
  SignInFormProps,
  SignInFormRef,
  signInFormSchema,
} from './types';
import { useLogin } from '@actions';
import { onNavigateAfterAuth, showMutationErrorToast } from '@helpers';
import { supabase } from '@services';

export const SignInForm = forwardRef<SignInFormRef, SignInFormProps>(
  (props, ref) => {
    const { containerStyle, onFormStateChange } = props;

    const { control, handleSubmit } = useForm<SignInFormData>({
      resolver: zodResolver(signInFormSchema),
    });

    const { mutate: loginMutate, isPending: isLoggingIn } = useLogin({
      onSuccess: async data => {
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });

        await onNavigateAfterAuth();
      },
      onError: showMutationErrorToast,
    });

    const onSignIn = useCallback(
      (data: SignInFormData) =>
        loginMutate({
          username: data.username.toLowerCase(),
          password: data.password,
        }),
      [loginMutate],
    );

    useImperativeHandle(
      ref,
      () => ({
        handleSubmit: handleSubmit(onSignIn),
      }),
      [handleSubmit, onSignIn],
    );

    useEffect(() => {
      onFormStateChange?.({ isLoggingIn });
    }, [isLoggingIn, onFormStateChange]);

    return (
      <View style={[styles.container, containerStyle]}>
        <Controller
          control={control}
          name="username"
          render={({ field, fieldState }) => (
            <AppInput
              label="Username"
              placeholder="Enter your username"
              value={field.value}
              onChangeText={text => field.onChange(text.toLowerCase())}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <AppInput
              label="Password"
              placeholder="Enter your password"
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
              secureTextEntry
            />
          )}
        />
      </View>
    );
  },
);
