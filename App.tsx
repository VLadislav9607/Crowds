import { TextInput, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './src/services';
import { AppNavigation } from './src/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
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
            <AppNavigation />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
