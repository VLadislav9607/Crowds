import { View } from 'react-native';
import { AppInput } from '@ui';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { styles } from './styles';
import {
  SignInFormData,
  SignInFormProps,
  SignInFormRef,
  signInFormSchema,
} from './types';
import { prefetchUseGetMe, useLogin } from '@actions';
import { showErrorToast } from '@helpers';
import { queryClient, supabase } from '@services';
import { goToScreen, Screens } from '@navigation';
import { UseGetMeResDto } from '../../../../actions/common/useGetMe/types';
import { TANSTACK_QUERY_KEYS } from '@constants';

export const SignInForm = forwardRef<SignInFormRef, SignInFormProps>(
  (props, ref) => {

    const { containerStyle, onFormStateChange } = props;

    const { control, handleSubmit } = useForm<SignInFormData>({
      resolver: zodResolver(signInFormSchema),
    });

    const { mutate: loginMutate, isPending: isLoggingIn } = useLogin();
    const [isProcessingSuccess, setIsProcessingSuccess] = useState(false);

    const onSignIn = (data: SignInFormData) => {
      loginMutate({
        username: data.username.toLowerCase(),
        password: data.password,
      }, {
        onError: e => {
          setIsProcessingSuccess(false);
          showErrorToast(e?.message);
        },
        onSuccess: async data => {
          setIsProcessingSuccess(true);
          try {
            await  supabase.auth.setSession({
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token,
            });

            const sessionResponse = await supabase.auth.getSession();
            const session = sessionResponse.data.session;
            if(session?.user?.app_metadata?.isTalent){
              await prefetchUseGetMe();
              const resp = queryClient.getQueryData<UseGetMeResDto>([TANSTACK_QUERY_KEYS.GET_ME]);
              const lastCompletedStep = resp?.talent?.onboarding_copleted_step || 0;
              goToScreen( lastCompletedStep < 4 ? Screens.OnboardingAuthTalent : Screens.BottomTabs)
            }else if(session?.user?.app_metadata?.isOrganizationMember){
              console.log('organization member')
              await prefetchUseGetMe();
              const resp =  queryClient.getQueryData<UseGetMeResDto>([TANSTACK_QUERY_KEYS.GET_ME]);
              console.log('resp', resp)
              const lastCompletedStep = resp?.organizationMember?.onboarding_copleted_step || 0;
              console.log('lastCompletedStep', lastCompletedStep)
              goToScreen( lastCompletedStep < 1 ? Screens.OnboardingAuthOrganization : Screens.BottomTabs)
            }
          } finally {
            setIsProcessingSuccess(false);
          }
        }

      });
    }

    useImperativeHandle(ref, () => ({
      handleSubmit: handleSubmit(onSignIn)
    }), [handleSubmit]);

    useEffect(() => {
      onFormStateChange?.({ isLoggingIn: isLoggingIn || isProcessingSuccess });
    }, [isLoggingIn, isProcessingSuccess, onFormStateChange]);

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
              onChangeText={field.onChange}
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
