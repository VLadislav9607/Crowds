import { View, GestureResponderEvent, Pressable } from 'react-native';

import { AppText, Avatar, IconButton } from '@ui';
import { ICONS } from '@assets';
import { usePopupMenu } from '@components';

import { TalentProfileRowProps } from './types';
import { styles } from './styles';
import { TalentFlag } from '../../types';

export const TalentProfileRow = ({
  talent,
  popUpItems,
  onMenuSelect,
  renderRightAction,
  onPressCard,
  showMenu = true,
}: TalentProfileRowProps) => {
  const { name, location, avatar_url, flag } = talent;
  const { showPopup } = usePopupMenu();

  const handleOpenMenu = (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;

    showPopup({
      items: popUpItems ?? [],
      position: { x: pageX, y: pageY },
      onSelect: onMenuSelect,
    });
  };

  return (
    <Pressable
      style={styles.container}
      disabled={!onPressCard}
      onPress={onPressCard}
    >
      <Avatar
        size={48}
        name={name}
        flag={(flag as TalentFlag) || TalentFlag.GREEN}
        imgPath={avatar_url}
        bucket="talents_avatars"
      />

      <View style={styles.infoContainer}>
        <AppText typography="bold_14">{name}</AppText>
        <AppText typography="regular_12" color="black_60">
          {location}
        </AppText>
      </View>

      {renderRightAction?.()}

      {showMenu && (
        <IconButton
          icon={ICONS.dotsVertical()}
          iconSize={24}
          onPress={handleOpenMenu}
        />
      )}
    </Pressable>
  );
};
