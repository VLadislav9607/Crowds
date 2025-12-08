import { createStackNavigator } from '@react-navigation/stack';

import { FirstScreen, SelectRoleScreen } from '../../modules/auth';
import { OnboardingTalentScreen } from '../../modules/onboarding/talent/screens';
import { TalentProfileSetupScreen } from '../../modules/profile/talent/screens';
import {
  CongratulationsScreen,
  OnboardingOrganizationScreen,
  TermsAndPrivacyScreen,
} from '../../modules/onboarding';

import { RootStackParamList } from '../types';
import { Screens } from '../constants';
import { BottomTabsNavigator } from './BottomTabsNavigator';

import {
  CopyInviteLinkScreen,
  InviteNewMemberScreen,
} from '../../modules/invite-member';
import { CreateEventScreen } from '../../modules/create-event';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName={Screens.BottomTabs}
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
        name={Screens.TalentProfileSetup}
        component={TalentProfileSetupScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <RootStack.Screen
        name={Screens.OnboardingOrganization}
        component={OnboardingOrganizationScreen}
      />

      <RootStack.Screen
        name={Screens.TermsAndPrivacy}
        component={TermsAndPrivacyScreen}
      />

      <RootStack.Screen
        name={Screens.Congratulations}
        component={CongratulationsScreen}
      />

      <RootStack.Screen
        name={Screens.InviteNewMember}
        component={InviteNewMemberScreen}
      />

      <RootStack.Screen
        name={Screens.CopyInviteLink}
        component={CopyInviteLinkScreen}
      />

      <RootStack.Screen
        name={Screens.CreateEvent}
        component={CreateEventScreen}
      />
    </RootStack.Navigator>
  );
};
