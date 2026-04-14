import { View, Platform } from 'react-native';
import { AppInput } from '@ui';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { styles } from './styles';
import {
  SignInFormData,
  SignInFormProps,
  SignInFormRef,
  signInFormSchema,
} from './types';
import { useLogin, upsertPushDeviceAction } from '@actions';
import { onNavigateAfterAuth, showMutationErrorToast } from '@helpers';
import { supabase, getDeviceId } from '@services';
import { usePermissions, EPermissionTypes } from '@hooks';
import {
  AccountSelectionModal,
  AccountSelectionModalRef,
} from '../../modals/AccountSelectionModal';

export const SignInForm = forwardRef<SignInFormRef, SignInFormProps>(
  (props, ref) => {
    const { containerStyle, onFormStateChange } = props;

    const { control, handleSubmit, getValues } = useForm<SignInFormData>({
      resolver: zodResolver(signInFormSchema),
    });

    const accountSelectionModalRef = useRef<AccountSelectionModalRef>(null);
    const credentialsRef = useRef<{ username: string; password: string } | null>(null);

    const { askNotificationPermissionAndGetTokens } = usePermissions(
      EPermissionTypes.NOTIFICATIONS,
    );

    const completeLogin = useCallback(async (session: { access_token: string; refresh_token: string }) => {
      await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });

      await onNavigateAfterAuth();

      const tokens = await askNotificationPermissionAndGetTokens();

      if (tokens?.fcmToken) {
        try {
          const deviceId = await getDeviceId();
          await upsertPushDeviceAction({
            deviceId,
            platform: Platform.OS,
            fcmToken: tokens.fcmToken,
          });
        } catch (error) {
          console.log('error', error);
        }
      }
    }, [askNotificationPermissionAndGetTokens]);

    const { mutate: loginMutate, isPending: isLoggingIn } = useLogin({
      onSuccess: async data => {
        if (data.requires_account_selection && data.accounts) {
          credentialsRef.current = getValues();
          accountSelectionModalRef.current?.open({
            accounts: data.accounts,
            onSelect: (accountType) => {
              if (credentialsRef.current) {
                loginMutate({
                  username: credentialsRef.current.username.toLowerCase(),
                  password: credentialsRef.current.password,
                  account_type: accountType,
                });
              }
            },
          });
          return;
        }

        if (data.session) {
          await completeLogin(data.session);
        }
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
              autoCapitalize="none"
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

        <AccountSelectionModal ref={accountSelectionModalRef} />
      </View>
    );
  },
);
