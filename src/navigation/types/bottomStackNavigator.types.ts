import { ComponentType } from 'react';

import { Screens } from '../constants';
import { Role } from '@modules/common';

export type OrgTabParams = {
  [Screens.EventsDashboard]: undefined;
  [Screens.UpcomingEvents]: undefined;
  [Screens.TalentsTab]: undefined;
  [Screens.Chats]: undefined;
  [Screens.ProfileTab]: undefined;
};

export type TalentTabParams = {
  [Screens.HomeTalent]: undefined;
  [Screens.TalerQRCode]: undefined;
  [Screens.EventsTalent]: undefined;
  [Screens.Chats]: undefined;
  [Screens.ProfileTab]: undefined;
};
export interface BottomTabScreen<RoleParams> {
  name: keyof RoleParams;
  component: ComponentType<any>;
  icon: (opacity: number) => string;
}

export type BottomTabsParamList = OrgTabParams | TalentTabParams;

type RoleTabParams = {
  [Role.ORGANIZATION]: OrgTabParams;
  [Role.TALENT]: TalentTabParams;
};

export type BottomTabsConfigType = {
  [R in keyof RoleTabParams]: Array<BottomTabScreen<RoleTabParams[R]>>;
};
