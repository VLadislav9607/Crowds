import { StatusBar } from 'react-native';
import {
  createNavigationContainerRef,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import ReactBootSplash from 'react-native-bootsplash';

import { COLORS } from '@styles';

import { RootStackNavigator } from './navigationStacks';
import { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

interface AppNavigationProps {
  onNavigationReady?: () => void;
}

export const AppNavigation = ({ onNavigationReady }: AppNavigationProps) => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.white,
    },
  };

  const handleReady = () => {
    ReactBootSplash.hide();
    onNavigationReady?.();
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={MyTheme}
      onReady={handleReady}
    >
      <StatusBar />
      <RootStackNavigator />
    </NavigationContainer>
  );
};
