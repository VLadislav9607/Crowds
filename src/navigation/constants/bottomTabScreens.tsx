import { ICONS } from '@assets';
import { Role } from '@modules/common';

import {
  EventsDashboardTabScreen,
  UpcomingEventsTabScreen,
  TalentEventsHomeTab,
  TalentEventsTab,
  QRCodeScanTab,
} from '../../modules/events';
import { ChatsTabScreen } from '../../modules/chats';
import { ProfileScreenTab } from '../../modules/profile';

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
      name: Screens.Chats,
      component: ChatsTabScreen,
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
      component: TalentEventsHomeTab,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.home(opacity),
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
      name: Screens.Chats,
      component: ChatsTabScreen,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.chats(opacity),
    },
    {
      name: Screens.ProfileTab,
      component: ProfileScreenTab,
      icon: (opacity: number) => ICONS.BOTTOM_TABS.profile(opacity),
    },
  ],
} as const;
