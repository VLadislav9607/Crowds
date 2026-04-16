import { ICONS } from '@assets';
import { goToScreen, Screens } from '@navigation';
import { ColorsKeys } from '@styles';
import { useGetMe } from '@actions';
import DeviceInfo from 'react-native-device-info';
import { Linking } from 'react-native';

interface ProfileOption {
  title: string;
  icon: string;
  textColor?: ColorsKeys;
  isInvisible?: boolean;
  onPress: () => void;
}

interface UseProfileTabOptionsProps {
  onLogout: () => void;
  onDeleteAccount: () => void;
  onTermsOfService: () => void;
}

export const useProfileTabOptions = ({
  onLogout,
  onDeleteAccount,
  onTermsOfService,
}: UseProfileTabOptionsProps) => {
  const { isTalent, organizationMember } = useGetMe();

  const talentOptions: ProfileOption[] = [
    {
      title: 'My folders',
      icon: ICONS.notification(),
      onPress: () => goToScreen(Screens.TalentFolders),
    },
    {
      title: 'My Location',
      icon: ICONS.locationMap('black'),
      onPress: () => goToScreen(Screens.TalentLocationSetup),
    },
    {
      title: 'Notification settings',
      icon: ICONS.notification(),
      onPress: () => goToScreen(Screens.NotificationSettings),
    },
    {
      title: 'Bank account details',
      icon: ICONS.user(),
      onPress: () => goToScreen(Screens.StripeConnectOnboarding),
    },
    {
      title: 'Payment History',
      icon: ICONS.moneyBag(),
      onPress: () => goToScreen(Screens.TalentPaymentHistory),
    },
    {
      title: 'Manage password',
      icon: ICONS.shieldCheck(),
      onPress: () => goToScreen(Screens.ChangePassword),
    },
    {
      title: 'Update my availability',
      icon: ICONS.calendarIcon(),
      onPress: () => goToScreen(Screens.AvailabilitySetup),
    },
    {
      title: 'FAQ',
      icon: ICONS.faq(),
      onPress: () => goToScreen(Screens.FAQ),
    },
    {
      title: 'Contact Us',
      icon: ICONS.chatSquare(),
      onPress: () => Linking.openURL('https://crowdsnow.com/contact-us/'),
    },
    {
      title: 'Terms of Service & Privacy',
      icon: ICONS.bookMark(),
      onPress: onTermsOfService,
    },
    {
      title: 'Delete account',
      icon: ICONS.trash('red'),
      textColor: 'red',
      onPress: onDeleteAccount,
    },
    {
      title: 'Logout',
      icon: ICONS.logout('red'),
      textColor: 'red',
      onPress: onLogout,
    },
  ];

  const organizationOptions: ProfileOption[] = [
    {
      title: 'Notification settings',
      icon: ICONS.notification(),
      onPress: () => goToScreen(Screens.NotificationSettings),
    },
    {
      title: 'Organization details',
      icon: ICONS.user(),
      onPress: () => goToScreen(Screens.OrgProfileSetup),
      isInvisible:
        !organizationMember?.current_context?.capabilitiesAccess
          .edit_business_info,
    },
    {
      title: 'My lists',
      icon: ICONS.customList(),
      onPress: () => goToScreen(Screens.MyLists),
    },
    {
      title: 'Manage team',
      icon: ICONS.user(),
      isInvisible:
        !organizationMember?.current_context?.capabilitiesAccess
          .edit_team_members,
      onPress: () => goToScreen(Screens.ManageOrgTeam),
    },
    {
      title: 'Manage password',
      icon: ICONS.shieldCheck(),
      onPress: () => goToScreen(Screens.ChangePassword),
    },
    {
      title: 'FAQ',
      icon: ICONS.faq(),
      onPress: () => goToScreen(Screens.FAQ),
    },
    {
      title: 'Contact Us',
      icon: ICONS.chatSquare(),
      onPress: () => Linking.openURL('https://crowdsnow.com/contact-us/'),
    },
    {
      title: 'Terms of Service & Privacy',
      icon: ICONS.bookMark(),
      onPress: onTermsOfService,
    },
    {
      title: `App version ${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`,
      icon: ICONS.circleInfo(),
      onPress: () => {},
    },
    {
      title: 'Delete account',
      icon: ICONS.trash('red'),
      textColor: 'red',
      onPress: onDeleteAccount,
    },
    {
      title: 'Logout',
      icon: ICONS.logout('red'),
      textColor: 'red',
      onPress: onLogout,
    },
  ];

  return isTalent ? talentOptions : organizationOptions;
};
