import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import { COLORS } from '@styles';
import { Role } from '@modules/common';

export const useCongratulationsScreen = () => {
  const { params } = useScreenNavigation<Screens.Congratulations>();

  const organizationButtons = [
    {
      title: 'Invite Member',
      onPress: () => goToScreen(Screens.InviteNewMember),
    },
    {
      title: 'No thanks, skip',
      onPress: () => goToScreen(Screens.BottomTabs),
      variant: 'withBorder',
      titleStyles: {
        color: COLORS.black,
      },
    },
  ];

  const talentButtons = [
    {
      title: 'Okay, let’s begin',
      onPress: () => goToScreen(Screens.BottomTabs),
    },
  ];

  const buttons =
    params?.role === Role.ORGANIZATION ? organizationButtons : talentButtons;

  return {
    buttons,
    role: params?.role,
  };
};
