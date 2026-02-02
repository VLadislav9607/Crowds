import { ReactNode } from 'react';
import { View } from 'react-native';

import { ScreenWithScrollWrapper } from '@components';
import { COLORS } from '@styles';
import { useGetMe } from '@actions';
import { TalentProfileHeader } from '../../talent/components';

import { styles } from './styles';
import { calculateAge } from '@utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ProfileScreenLayoutProps {
  children: ReactNode;
}

export const ProfileScreenLayout = ({ children }: ProfileScreenLayoutProps) => {
  const { me, isTalent, talent } = useGetMe();
  const insets = useSafeAreaInsets();

  const location = talent?.talent_location;

  return (
    <ScreenWithScrollWrapper
      title={isTalent ? undefined : 'Profile'}
      headerVariant={isTalent ? 'empty' : 'withTitleAndImageBg'}
      headerStyles={{ backgroundColor: COLORS.black }}
      contentContainerStyle={{ paddingBottom: insets.bottom + 75 }}
      customElement={
        isTalent ? (
          <TalentProfileHeader
            fullName={talent?.first_name ?? '' + ' ' + talent?.last_name}
            gender={me?.gender || ''}
            age={calculateAge(talent?.birth_date)}
            avatarUri={talent?.avatar_path || undefined}
            location={`${location?.country}, ${location?.city}`}
          />
        ) : undefined
      }
    >
      <View
        style={[
          [styles.contentContainer],
          !isTalent && styles.contentContainerOrg,
        ]}
      >
        {children}
      </View>
    </ScreenWithScrollWrapper>
  );
};
