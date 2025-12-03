import { NavigatorScreenParams } from '@react-navigation/native';

import { Screens } from '../constants';
import { BottomStackScreens } from './bottomStackNavigator.types';

export type RootStackParamList = {
  [Screens.First]: undefined;
  [Screens.SelectRole]: undefined;
  [Screens.BottomTabs]: NavigatorScreenParams<BottomStackScreens>;
  [Screens.OnboardingTalent]: undefined;
  [Screens.CreatePassword]: undefined;
  [Screens.TalentProfileSetup]: undefined;
};
