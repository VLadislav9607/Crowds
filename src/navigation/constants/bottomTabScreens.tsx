import { ICONS } from '@assets';
import { Role } from '@modules/common';

import {
  HomeTabScreen,
} from '../../modules/home';

import { HomeTabScreen, HomeTalentTabScreen } from '../../modules/home';
import {
  EventsDashboardTabScreen,
  UpcomingEventsTabScreen,
  TalentEventsHomeTab,
  TalentEventsTab,
  QRCodeScanTab
} from '../../modules/events';
import { ChatsTabScreen } from '../../modules/chats';

import { BottomTabsConfigType } from '../types';
import { Screens } from './screens';
import { TalentProfileTab } from '../../modules/profile/talent/screens';

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
      component: ChatsTabScreen,
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
      component: TalentEventsHomeTab,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.home(opacity),
    },
    {
      component: HomeTalentTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.home(opacity),
    },
    {
      name: Screens.ChatsTalent,
      component: ChatsTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.chats(opacity),
    },
    {
      name: Screens.EventsTalent,
      component: TalentEventsTab,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.events(opacity),
    },
    {
      name: Screens.TalerQRCode,
      component: QRCodeScanTab,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.qrCode(opacity),
    },
    {
      name: Screens.ChatsTalent,
      component: HomeTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.chats(opacity),
    },
    {
      name: Screens.ProfileTalent,
      component: TalentProfileTab,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.profile(opacity),
    },
  ],
} as const;
