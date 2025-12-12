import { TextInput, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { queryClient } from './src/services';
import { AppNavigation } from './src/navigation';
import { PopupMenuProvider } from './src/components';
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

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <PopupMenuProvider>
              <AppNavigation />
            </PopupMenuProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
