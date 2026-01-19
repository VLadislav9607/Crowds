import { createStackNavigator } from '@react-navigation/stack';

import {
  FirstScreen,
  ForgotPasswordScreen,
  SelectRoleScreen,
  SignInScreen,
  SplashScreen,
} from '../../modules/auth';
import {
  OnboardingUnAuthTalentScreen,
  OnboardingAuthTalentScreen,
} from '../../modules/onboarding/talent/screens';
import { TalentProfileSetupScreen } from '../../modules/profile/talent/screens';
import { AvailabilitySetupScreen } from '../../modules/talent-availability';
import {
  CongratulationsScreen,
  OrgIdentityVerificationScreen,
  OnboardingUnAuthOrganizationScreen,
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
import {
  TalentEventDetailsScreen,
  TalentSearchEventsScreen,
} from '../../modules/events/talent/screens';
import {
  ChangePasswordScreen,
  NotificationSettingsScreen,
} from '@modules/profile';
import { ManageEventScreen } from '../../modules/event-management';
import { ChatRoomScreen } from '../../modules/chats';
import {
  EventParticipantsScreen,
  FlagParticipantScreen,
} from '../../modules/event-participants';
import {
  ApplicantProfileScreen,
  EventApplicantsScreen,
} from '../../modules/event-applicants';
import {
  AddTalentsToListScreen,
  CustomTalentsListScreen,
  InviteTalentsScreen,
} from '../../modules/invite-talents';
import { VerificationPersonScreen } from '../../modules/kyc';
import { ManageOrgTeamScreen } from '../../modules/organization-team';

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName={Screens.SplashScreen}
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name={Screens.SplashScreen} component={SplashScreen} />
      <RootStack.Screen name={Screens.First} component={FirstScreen} />
      <RootStack.Screen
        name={Screens.SelectRole}
        component={SelectRoleScreen}
      />
      <RootStack.Screen
        name={Screens.OnboardingUnAuthTalent}
        component={OnboardingUnAuthTalentScreen}
      />
      <RootStack.Screen
        name={Screens.BottomTabs}
        component={BottomTabsNavigator}
        options={{ gestureEnabled: false }}
      />
      <RootStack.Screen name={Screens.SignIn} component={SignInScreen} />
      <RootStack.Screen
        name={Screens.ForgotPassword}
        component={ForgotPasswordScreen}
      />
      <RootStack.Screen
        options={{ gestureEnabled: false }}
        name={Screens.OnboardingAuthTalent}
        component={OnboardingAuthTalentScreen}
      />

      <RootStack.Screen
        options={{ gestureEnabled: false }}
        name={Screens.OrgIdentityVerification}
        component={OrgIdentityVerificationScreen}
      />

      <RootStack.Screen
        name={Screens.TalentProfileSetup}
        component={TalentProfileSetupScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <RootStack.Screen
        name={Screens.OnboardingUnAuthOrganization}
        component={OnboardingUnAuthOrganizationScreen}
      />

      <RootStack.Screen
        name={Screens.TermsAndPrivacy}
        component={TermsAndPrivacyScreen}
      />

      <RootStack.Screen
        name={Screens.VerificationPerson}
        component={VerificationPersonScreen}
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
        options={{ gestureEnabled: false }}
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
        name={Screens.EventApplicants}
        component={EventApplicantsScreen}
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

      <RootStack.Screen
        name={Screens.NotificationSettings}
        component={NotificationSettingsScreen}
      />
      <RootStack.Screen
        name={Screens.ApplicantProfile}
        component={ApplicantProfileScreen}
      />

      <RootStack.Screen
        name={Screens.InviteTalents}
        component={InviteTalentsScreen}
      />

      <RootStack.Screen
        name={Screens.CustomTalentsList}
        component={CustomTalentsListScreen}
      />

      <RootStack.Screen
        name={Screens.AddTalentsToList}
        component={AddTalentsToListScreen}
      />
      <RootStack.Screen
        name={Screens.ManageOrgTeam}
        component={ManageOrgTeamScreen}
      />
    </RootStack.Navigator>
  );
};
