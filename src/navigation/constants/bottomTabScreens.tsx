import { ICONS } from '@assets';
import { Role } from '@modules/common';

import {
  HomeOrganizationTabScreen,
  HomeTabScreen,
  HomeTalentTabScreen,
} from '../../modules/home';
import { HomeTabScreen } from '../../modules/home';
import {
  EventsDashboardTabScreen,
  UpcomingEventsTabScreen,
} from '../../modules/events';

import { BottomTabsConfigType } from '../types';
import { Screens } from './screens';

export const BottomTabsConfig: BottomTabsConfigType = {
  [Role.ORGANIZATION]: [
    {
      name: Screens.EventsDashboard,
      component: EventsDashboardTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.home(opacity),
    },
    {
      name: Screens.UpcomingEvents,
      component: UpcomingEventsTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.events(opacity),
    },
    {
      name: Screens.ChatsOrganization,
      component: HomeTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.chats(opacity),
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
      component: HomeTalentTabScreen,
      component: HomeTabScreen,
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
