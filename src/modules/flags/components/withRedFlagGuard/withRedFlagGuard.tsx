import React from 'react';
import { useGetMe } from '@actions';
import { TalentFlag } from '@modules/common';
import { ScreenWrapper } from '@components';
import { COLORS } from '@styles';
import { RedFlagBanner } from '../RedFlagBanner';

export const withRedFlagGuard = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const GuardedComponent = (props: P) => {
    const { talent } = useGetMe();

    if (talent?.flag === TalentFlag.RED) {
      return (
        <ScreenWrapper
          headerVariant="withLogo"
          logoProps={{ width: 164, height: 34.5 }}
          headerStyles={{ backgroundColor: COLORS.black }}
          withBottomTabBar={true}
        >
          <RedFlagBanner />
        </ScreenWrapper>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return GuardedComponent;
};
