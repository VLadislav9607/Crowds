import { useEffect, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { If } from '@components';
import { AppText } from '@ui';

import { LogoutModal, LogoutModalRef } from '../../modals';
import { ProfileScreenLayout } from '../../layouts';
import { styles } from './styles';
import { useProfileTabOptions } from '../../hooks';
import { supabase } from '@services';

export const ProfileScreenTab = () => {
  const logoutModalRef = useRef<LogoutModalRef>(null);

  const options = useProfileTabOptions({
    onLogout: () => logoutModalRef.current?.open({}),
  });

  const getMe = async () => {
    const { data, error } = await supabase.rpc('get_my_org_user');
    if (error) {
      console.log('error', error);
    }
    console.log('data', data);
    return data;
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <ProfileScreenLayout>
      {options.map((option, index) => {
        const isLastItem = index === options.length - 1;
        return (
          <View key={option.title}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.optionItem}
              onPress={option.onPress}
            >
              <SvgXml xml={option.icon} width={20} height={20} />
              <AppText color={option.textColor || 'black'} typography="bold_14">
                {option.title}
              </AppText>
            </TouchableOpacity>
            <If condition={!isLastItem}>
              <View style={styles.divider} />
            </If>
          </View>
        );
      })}

      <LogoutModal ref={logoutModalRef} />
    </ProfileScreenLayout>
  );
};
