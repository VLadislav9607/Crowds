import { StatusBar } from 'react-native';
import {
  createNavigationContainerRef,
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import ReactBootSplash from 'react-native-bootsplash';

import { COLORS } from '@styles';

import { RootStackNavigator } from './navigationStacks';
import { RootStackParamList } from './types';
import { Screens } from './constants';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['crowdsnow://'],
  config: {
    screens: {
      [Screens.AcceptInvitation]: 'invite/:token',
    },
  },
};

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
      linking={linking}
    >
      <StatusBar />
      <RootStackNavigator />
    </NavigationContainer>
  );
};
