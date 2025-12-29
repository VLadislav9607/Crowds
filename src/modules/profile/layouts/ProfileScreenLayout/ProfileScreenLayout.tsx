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
  const { me, isTalent } = useGetMe();

  console.log('me', me);

  return (
    <ScreenWithScrollWrapper
      title={isTalent ? undefined : 'Profile'}
      headerVariant={isTalent ? 'empty' : 'withTitleAndImageBg'}
      headerStyles={{ backgroundColor: COLORS.black }}
      customElement={
        isTalent ? (
          <TalentProfileHeader
            fullName={me?.first_name ?? '' + ' ' + me?.last_name}
            gender={me?.gender || ''}
            age={calculateAge(me?.birth_date)}
            avatarUri={me?.avatar_path}
            location={`${me?.talent_location?.country}, ${me?.talent_location?.city}`}
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
