import { ComponentType } from 'react';

import { Screens } from '../constants';
import { Role } from '@modules/common';

export type OrgTabParams = {
  [Screens.EventsDashboard]: undefined;
  [Screens.UpcomingEvents]: undefined;
  [Screens.ChatsOrganization]: undefined;
  [Screens.SettingsOrganization]: undefined;
  [Screens.ProfileOrganization]: undefined;
};

export type TalentTabParams = {
  [Screens.HomeTalent]: undefined;
  [Screens.EventsTalent]: undefined;
  [Screens.ChatsTalent]: undefined;
  [Screens.SettingsTalent]: undefined;
  [Screens.ProfileTalent]: undefined;
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
