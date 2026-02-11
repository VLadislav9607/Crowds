import { Platform } from 'react-native';
import { TextInput, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import {
  supabase,
  getDeviceId,
  subscribeToTokenRefresh,
  queryClient,
} from './src/services';
import {
  AppNavigation,
  goToScreen,
  Screens,
  navigationRef,
} from './src/navigation';
import { AppToast, PopupMenuProvider } from './src/components';
import { useEffect, useState } from 'react';
import { onNavigateAfterAuth } from '@helpers';
import { upsertPushDeviceAction } from './src/actions';

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

  const [shouldNavigateToFirst, setShouldNavigateToFirst] = useState(false);

  const handleNavigationReady = () => {
    if (shouldNavigateToFirst) {
      goToScreen(Screens.First);
    }
  };

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(async ({ data: { session } }) => {
        if (!session) {
          setShouldNavigateToFirst(true);
          if (navigationRef.isReady()) {
            goToScreen(Screens.First);
          }
        } else {
          onNavigateAfterAuth();
        }
      })
      .catch(() => {
        onNavigateAfterAuth();
      });
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToTokenRefresh(async fcmToken => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;
      try {
        const deviceId = await getDeviceId();
        await upsertPushDeviceAction({
          deviceId,
          platform: Platform.OS,
          fcmToken,
        });
      } catch {}
    });
    return unsubscribe;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.container}>
          <BottomSheetModalProvider>
            <PopupMenuProvider>
              <AppNavigation onNavigationReady={handleNavigationReady} />
              <AppToast />
            </PopupMenuProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
