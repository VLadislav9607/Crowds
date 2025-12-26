import { TextInput, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { queryClient, supabase } from './src/services';
import { AppNavigation, goToScreen, Screens } from './src/navigation';
import { AppToast, PopupMenuProvider } from './src/components';
import { useEffect } from 'react';
import { onNavigateAfterAuth } from '@helpers';

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

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        goToScreen(Screens.First);
        return;
      }
      onNavigateAfterAuth(session);
    });
  }, []);

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
