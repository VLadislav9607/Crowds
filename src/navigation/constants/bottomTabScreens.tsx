import { ICONS } from '@assets';
import { Role } from '@modules/common';
import { Screens } from './screens';

import { HomeOrganizationTabScreen, HomeTabScreen } from '../../modules/home';
import { BottomTabsConfigType } from '../types';

export const BottomTabsConfig: BottomTabsConfigType = {
  [Role.ORGANIZATION]: [
    {
      name: Screens.HomeOrganization,
      component: HomeOrganizationTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.home(opacity),
    },
    {
      name: Screens.ChatsOrganization,
      component: HomeTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.chats(opacity),
    },
    {
      name: Screens.EventsOrganization,
      component: HomeTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.events(opacity),
    },
    {
      name: Screens.SettingsOrganization,
      component: HomeTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.settings(opacity),
    },
    {
      name: Screens.ProfileOrganization,
      component: HomeTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.profile(opacity),
    },
  ],

  [Role.TALENT]: [
    {
      name: Screens.HomeTalent,
      component: HomeOrganizationTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.home(opacity),
    },
    {
      name: Screens.ChatsTalent,
      component: HomeTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.chats(opacity),
    },
    {
      name: Screens.EventsTalent,
      component: HomeTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.events(opacity),
    },
    {
      name: Screens.SettingsTalent,
      component: HomeTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.settings(opacity),
    },
    {
      name: Screens.ProfileTalent,
      component: HomeTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.profile(opacity),
    },
  ],
} as const;
