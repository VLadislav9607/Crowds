import React from 'react';
import { useGetMe } from '@actions';
import { TalentFlag } from '@modules/common';
import { ScreenWrapper } from '@components';
import { COLORS } from '@styles';
import { OrgRedFlagBanner } from '../OrgRedFlagBanner';

export const withOrgFlagGuard = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const GuardedComponent = (props: P) => {
    const { organizationMember } = useGetMe();
    const officeFlag =
      organizationMember?.current_context?.officeFlag ?? TalentFlag.GREEN;

    if (officeFlag === TalentFlag.RED || officeFlag === TalentFlag.BLACK) {
      return (
        <ScreenWrapper
          headerVariant="withLogo"
          logoProps={{ width: 164, height: 34.5 }}
          headerStyles={{ backgroundColor: COLORS.black }}
          withBottomTabBar={true}
        >
          <OrgRedFlagBanner />
        </ScreenWrapper>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return GuardedComponent;
};
