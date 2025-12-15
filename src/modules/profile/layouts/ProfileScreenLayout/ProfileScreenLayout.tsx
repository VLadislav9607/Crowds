import { ReactNode } from 'react';
import { View } from 'react-native';

import { ScreenWithScrollWrapper } from '@components';
import { COLORS } from '@styles';
import { Role } from '@modules/common';
import { TalentProfileHeader } from '../../talent/components';

import { styles } from './styles';

interface ProfileScreenLayoutProps {
  children: ReactNode;
}

export const ProfileScreenLayout = ({ children }: ProfileScreenLayoutProps) => {
  const role = Role.TALENT;

  const isTalent = role === Role.TALENT;

  return (
    <ScreenWithScrollWrapper
      title={isTalent ? undefined : 'Profile'}
      headerVariant={isTalent ? 'empty' : 'withTitleAndImageBg'}
      headerStyles={{ backgroundColor: COLORS.black }}
      customElement={isTalent ? <TalentProfileHeader /> : undefined}
    >
      <View
        style={[
          styles.contentContainer,
          !isTalent && styles.contentContainerOrg,
        ]}
      >
        {children}
      </View>
    </ScreenWithScrollWrapper>
  );
};
