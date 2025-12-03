import { NavigatorScreenParams } from '@react-navigation/native';

import { Role } from '@modules/common';

import { Screens } from '../constants';
import { BottomStackScreenParams } from './bottomStackNavigator.types';

export type RootStackParamList = {
  // Authorization
  [Screens.First]: undefined;
  [Screens.SelectRole]: undefined;
  [Screens.BottomTabs]: NavigatorScreenParams<BottomStackScreens>;
  [Screens.OnboardingTalent]: undefined;
  [Screens.CreatePassword]: undefined;
  [Screens.TalentProfileSetup]: undefined;

  // Bottom Tabs
  [Screens.BottomTabs]: NavigatorScreenParams<BottomStackScreenParams>;

  // Onboarding
  [Screens.OnboardingSingleOrganization]: { name: string };
  [Screens.TermsAndPrivacy]: undefined;
  [Screens.Congratulations]: { role: Role };
};
