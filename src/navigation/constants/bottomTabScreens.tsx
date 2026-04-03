import { ICONS } from '@assets';
import { Role } from '@modules/common';
import { withRedFlagGuard, withOrgFlagGuard } from '../../modules/flags';

import {
  EventsDashboardTabScreen,
  UpcomingEventsTabScreen,
  TalentEventsHomeTab,
  TalentEventsTab,
  QRCodeScanTab,
} from '../../modules/events';
import { ChatsTabScreen } from '../../modules/chats';
import { ProfileScreenTab } from '../../modules/profile';
import { TalentsTabScreen } from '../../modules/talent-profile';

import { BottomTabsConfigType } from '../types';
import { Screens } from './screens';

export const BottomTabsConfig: BottomTabsConfigType = {
  [Role.ORGANIZATION]: [
    {
      name: Screens.EventsDashboard,
      component: withOrgFlagGuard(EventsDashboardTabScreen),
      icon: (opacity: number) => ICONS.BOTTOM_TABS.home(opacity),
    },
    {
      name: Screens.UpcomingEvents,
      component: UpcomingEventsTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.events(opacity),
    },
    {
      name: Screens.TalentsTab,
      component: withOrgFlagGuard(TalentsTabScreen),
      icon: (opacity: number) => ICONS.BOTTOM_TABS.profiles(opacity),
    },
    {
      name: Screens.Chats,
      component: withOrgFlagGuard(ChatsTabScreen),
      icon: (opacity: number) => ICONS.BOTTOM_TABS.chats(opacity),
    },
    {
      name: Screens.ProfileTab,
      component: ProfileScreenTab,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.profile(opacity),
    },
  ],

  [Role.TALENT]: [
    {
      name: Screens.HomeTalent,
      component: withRedFlagGuard(TalentEventsHomeTab),
      icon: (opacity: number) => ICONS.BOTTOM_TABS.home(opacity),
    },
    {
      name: Screens.EventsTalent,
      component: withRedFlagGuard(TalentEventsTab),
      icon: (opacity: number) => ICONS.BOTTOM_TABS.events(opacity),
    },
    {
      name: Screens.TalerQRCode,
      component: withRedFlagGuard(QRCodeScanTab),
      icon: (opacity: number) => ICONS.BOTTOM_TABS.qrCode(opacity),
    },
    {
      name: Screens.Chats,
      component: withRedFlagGuard(ChatsTabScreen),
      icon: (opacity: number) => ICONS.BOTTOM_TABS.chats(opacity),
    },
    {
      name: Screens.ProfileTab,
      component: ProfileScreenTab,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.profile(opacity),
    },
  ],
} as const;
