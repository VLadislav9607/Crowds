import { ComponentType } from 'react';

import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackNavigator.types';
import { Screens } from '../constants';

export type BottomStackScreenParams = {
  [Screens.Home]?: undefined;
  [Screens.Events]?: undefined;
  [Screens.Chats]?: undefined;
  [Screens.Settings]?: undefined;
  [Screens.Profile]?: undefined;
};

export interface BottomTabScreenType {
  name: keyof BottomStackScreenParams;
  component: ComponentType<BottomStackScreenParams>;
  icon: (opacity: number) => string;
}

export type BottomStackNavigationType = CompositeNavigationProp<
  StackNavigationProp<BottomStackScreenParams>,
  StackNavigationProp<RootStackParamList>
>;
