import { View, GestureResponderEvent } from 'react-native';

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
}: TalentProfileRowProps) => {
  const { name, location, avatarUrl } = talent;
  const { showPopup } = usePopupMenu();

  const handleOpenMenu = (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;

    showPopup({
      items: popUpItems,
      position: { x: pageX, y: pageY },
      onSelect: onMenuSelect,
    });
  };

  return (
    <View style={styles.container}>
      <Avatar
        size={48}
        name={name}
        flag={TalentFlag.GREEN}
        imgPath={avatarUrl}
        bucket="talents_avatars"
      />

      <View style={styles.infoContainer}>
        <AppText typography="bold_14">{name}</AppText>
        <AppText typography="regular_12" color="black_60">
          {location}
        </AppText>
      </View>

      {renderRightAction()}

      <IconButton
        icon={ICONS.dotsVertical()}
        iconSize={24}
        onPress={handleOpenMenu}
      />
    </View>
  );
};
