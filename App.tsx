import { TextInput, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { queryClient, supabase } from './src/services';
import { AppNavigation, goToScreen, Screens } from './src/navigation';
import { AppToast, PopupMenuProvider } from './src/components';
import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { prefetchUseGetMe } from '@actions';
import { TANSTACK_QUERY_KEYS } from './src/constants';
import { UseGetMeResDto } from './src/actions/common/useGetMe/types';


interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}


const App = () => {
  (Text as unknown as TextWithDefaultProps).defaultProps = {
    ...((Text as unknown as TextWithDefaultProps).defaultProps ?? {}),
    allowFontScaling: false,
  };
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps = {
    ...((TextInput as unknown as TextInputWithDefaultProps).defaultProps ?? {}),
    allowFontScaling: false,
  };


  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if(!session) {
        goToScreen(Screens.First)
        return;
      }
      setSession(session)
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
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <PopupMenuProvider>
              <AppNavigation />
              <AppToast />
            </PopupMenuProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
