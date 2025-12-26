import { ReactNode } from 'react';
import { View } from 'react-native';

import { ScreenWithScrollWrapper } from '@components';
import { COLORS } from '@styles';
import { useGetMe } from '@actions';
import { TalentProfileHeader } from '../../talent/components';

import { styles } from './styles';
import { calculateAge } from '@utils';

interface ProfileScreenLayoutProps {
  children: ReactNode;
}

export const ProfileScreenLayout = ({ children }: ProfileScreenLayoutProps) => {
  const { data: me, isTalent } = useGetMe();

  return (
    <ScreenWithScrollWrapper
      title={isTalent ? undefined : 'Profile'}
      headerVariant={isTalent ? 'empty' : 'withTitleAndImageBg'}
      headerStyles={{ backgroundColor: COLORS.black }}
      customElement={
        isTalent ? (
          <TalentProfileHeader
            fullName={
              me?.talent?.first_name ?? '' + ' ' + me?.talent?.last_name
            }
            gender={me?.talent?.gender || ''}
            age={calculateAge(me?.talent?.birth_date)}
            avatarUri={''}
          />
        ) : undefined
      }
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
