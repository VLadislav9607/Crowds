import { View, Image } from 'react-native';

import { If } from '@components';

import { AppText } from '../AppText';
import { styles, AVATAR_TYPOGRAPHY } from './styles';
import { IAvatarProps } from './types';

const getInitials = (name?: string): string => {
  if (!name) return '';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

export const Avatar = ({ size = 40, uri, name, style }: IAvatarProps) => {
  const initials = getInitials(name);
  const sizeStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <View style={[styles.avatar, sizeStyle, style]}>
      <If condition={!!uri}>
        <Image source={{ uri }} style={styles.image} />
      </If>
      <If condition={!uri}>
        <View style={[styles.placeholder, sizeStyle]}>
          <AppText typography={AVATAR_TYPOGRAPHY[size]} style={styles.initials}>
            {initials}
          </AppText>
        </View>
      </If>
    </View>
  );
};
