import { ICONS } from '@assets';

import { BottomTabScreenType } from '../types';
import { Screens } from './screens';
import { HomeTabScreen } from '../../modules/home';

export const BottomTabScreensList: BottomTabScreenType[] = [
  {
    name: Screens.Home,
    component: HomeTabScreen,
    icon: (opacity: number) => ICONS.BOTTOM_TABS.home(opacity),
  },
  {
    name: Screens.Chats,
    component: HomeTabScreen,
    icon: (opacity: number) => ICONS.BOTTOM_TABS.chats(opacity),
  },
  {
    name: Screens.Events,
    component: HomeTabScreen,
    icon: (opacity: number) => ICONS.BOTTOM_TABS.events(opacity),
  },
  {
    name: Screens.Settings,
    component: HomeTabScreen,
    icon: (opacity: number) => ICONS.BOTTOM_TABS.settings(opacity),
  },
  {
    name: Screens.Profile,
    component: HomeTabScreen,
    icon: (opacity: number) => ICONS.BOTTOM_TABS.profile(opacity),
  },
];
