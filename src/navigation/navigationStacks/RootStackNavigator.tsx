import { createStackNavigator } from '@react-navigation/stack';

import {
  FirstScreen,
  ForgotPasswordScreen,
  SelectRoleScreen,
  SignInScreen,
} from '../../modules/auth';
import { OnboardingTalentScreen } from '../../modules/onboarding/talent/screens';
import { TalentNotificationSettingsScreen, TalentProfileSetupScreen } from '../../modules/profile/talent/screens';
import { TalentProfileSetupScreen } from '../../modules/profile/talent/screens';
import { AvailabilitySetupScreen } from '../../modules/talent-availability';
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
import { TalentEventDetailsScreen, TalentSearchEventsScreen } from '../../modules/events/talent/screens';
import { ChangePasswordScreen } from '@modules/profile';
import { ManageEventScreen } from '../../modules/event-management';
import { ChatRoomScreen } from '../../modules/chats';
import {
  EventParticipantsScreen,
  FlagParticipantScreen,
} from '../../modules/event-participants';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName={Screens.FlagParticipant}
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
      <RootStack.Screen name={Screens.SignIn} component={SignInScreen} />
      <RootStack.Screen
        name={Screens.ForgotPassword}
        component={ForgotPasswordScreen}
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
      <RootStack.Screen
        name={Screens.TalentSearchEvents}
        component={TalentSearchEventsScreen}
      />
      <RootStack.Screen
        name={Screens.TalentEventDetails}
        component={TalentEventDetailsScreen}
      />
      <RootStack.Screen
        name={Screens.TalentNotificationSettings}
        component={TalentNotificationSettingsScreen}
      />
      <RootStack.Screen
        name={Screens.ChangePassword}
        component={ChangePasswordScreen}
      />

      <RootStack.Screen
        name={Screens.ManageEvent}
        component={ManageEventScreen}
      />

      <RootStack.Screen
        name={Screens.EventParticipants}
        component={EventParticipantsScreen}
      />

      <RootStack.Screen
        name={Screens.FlagParticipant}
        component={FlagParticipantScreen}
      />

      <RootStack.Screen
        name={Screens.AvailabilitySetup}
        component={AvailabilitySetupScreen}
      />

      <RootStack.Screen name={Screens.ChatRoom} component={ChatRoomScreen} />
    </RootStack.Navigator>
  );
};
