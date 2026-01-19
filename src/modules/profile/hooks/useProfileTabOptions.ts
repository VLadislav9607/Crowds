import { ICONS } from '@assets';
import { goToScreen, Screens } from '@navigation';
import { ColorsKeys } from '@styles';
import { useGetMe } from '@actions';

interface ProfileOption {
  title: string;
  icon: string;
  textColor?: ColorsKeys;
  onPress: () => void;
}

interface UseProfileTabOptionsProps {
  onLogout: () => void;
}

export const useProfileTabOptions = ({
  onLogout,
}: UseProfileTabOptionsProps) => {
  const { isTalent } = useGetMe();

  const talentOptions: ProfileOption[] = [
    {
      title: 'My folders',
      icon: ICONS.notification(),
      onPress: () => {},
    },
    {
      title: 'Notification settings',
      icon: ICONS.notification(),
      onPress: () => goToScreen(Screens.NotificationSettings),
    },
    {
      title: 'Bank account details',
      icon: ICONS.user(),
      onPress: () => {},
    },
    {
      title: 'Payment History',
      icon: ICONS.moneyBag(),
      onPress: () => {},
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
      title: 'Terms and conditions',
      icon: ICONS.bookMark(),
      onPress: () => {},
    },
    {
      title: 'Delete account information',
      icon: ICONS.circleInfo(),
      onPress: () => {},
    },
    {
      title: 'Privacy policy',
      icon: ICONS.userShield(),
      onPress: () => {},
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
      onPress: () => {},
    },
    {
      title: 'Manage team',
      icon: ICONS.user(),
      onPress: () => goToScreen(Screens.ManageOrgTeam),
    },
    {
      title: 'Wallet / Payment details',
      icon: ICONS.wallet(),
      onPress: () => {},
    },
    {
      title: 'Manage password',
      icon: ICONS.shieldCheck(),
      onPress: () => goToScreen(Screens.ChangePassword),
    },
    {
      title: 'Access your information',
      icon: ICONS.orgDetails(),
      onPress: () => {},
    },
    {
      title: 'Terms and conditions',
      icon: ICONS.bookMark(),
      onPress: () => {},
    },
    {
      title: 'Privacy policy',
      icon: ICONS.userShield(),
      onPress: () => {},
    },
    {
      title: 'App version 1.0',
      icon: ICONS.circleInfo(),
      onPress: () => {},
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
