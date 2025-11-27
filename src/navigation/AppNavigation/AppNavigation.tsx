import { StatusBar } from 'react-native';
import {
  createNavigationContainerRef,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import ReactBootSplash from 'react-native-bootsplash';

import { COLORS } from '@styles';
import { RootStackNavigator } from '../navigationStacks';
import { RootStackParamList } from '../types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const AppNavigation = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.white,
    },
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={MyTheme}
      onReady={() => ReactBootSplash.hide()}
    >
      <StatusBar />
      <RootStackNavigator />
    </NavigationContainer>
  );
};
