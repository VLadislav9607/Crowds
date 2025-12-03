import { createStackNavigator } from '@react-navigation/stack';

import { FirstScreen, SelectRoleScreen } from '../../modules/auth';
import { OnboardingTalentScreen } from '../../modules/onboarding/talent/screens';
import { CreatePasswordScreen } from '../../modules/onboarding/screens';
import { TalentProfileSetupScreen } from '../../modules/profile/talent/screens';

import { RootStackParamList } from '../types';
import { Screens } from '../constants';
import { BottomTabsNavigator } from './BottomTabsNavigator';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName={Screens.First}
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name={Screens.First} component={FirstScreen} />
      <RootStack.Screen
        name={Screens.SelectRole}
        component={SelectRoleScreen}
      />
      <RootStack.Screen
        name={Screens.BottomTabs}
        component={BottomTabsNavigator}
      />
      <RootStack.Screen
        name={Screens.OnboardingTalent}
        component={OnboardingTalentScreen}
      />
      <RootStack.Screen
        name={Screens.CreatePassword}
        component={CreatePasswordScreen}
      />
      <RootStack.Screen
        name={Screens.TalentProfileSetup}
        component={TalentProfileSetupScreen}
      />
    </RootStack.Navigator>
  );
};
