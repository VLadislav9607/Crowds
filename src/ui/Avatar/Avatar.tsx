import { View, Image } from 'react-native';

import { If } from '@components';
import { COLORS } from '@styles';

import { AppText } from '../AppText';
import {
  styles,
  AVATAR_TYPOGRAPHY,
  AVATAR_FLAG_COLOR,
  AVATAR_FLAG_SIZE,
} from './styles';
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

export const Avatar = ({ size = 40, uri, name, flag, style }: IAvatarProps) => {
  const sizeStyle = {
    width: size,
    height: size,
    borderRadius: 50,
  };

  const flagSize = AVATAR_FLAG_SIZE[size];

  return (
    <View style={[styles.avatar, sizeStyle, style]}>
      <If condition={!!uri}>
        <Image source={{ uri }} style={styles.image} />
      </If>
      <If condition={!uri}>
        <View style={[styles.placeholder, sizeStyle]}>
          <AppText typography={AVATAR_TYPOGRAPHY[size]} style={styles.initials}>
            {getInitials(name)}
          </AppText>
        </View>
      </If>
      <If condition={!!flag}>
        <View
          style={[
            styles.flagContainer,
            {
              width: flagSize.container,
              height: flagSize.container,
            },
          ]}
        >
          <View
            style={[
              styles.flag,
              {
                width: flagSize.indicator,
                height: flagSize.indicator,
                backgroundColor: flag && COLORS[AVATAR_FLAG_COLOR[flag]],
              },
            ]}
          />
        </View>
      </If>
    </View>
  );
};
