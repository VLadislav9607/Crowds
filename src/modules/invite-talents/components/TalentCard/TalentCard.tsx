import { View, GestureResponderEvent } from 'react-native';

import { AppButton, AppText, Avatar, IconButton } from '@ui';
import { ICONS } from '@assets';
import { usePopupMenu } from '@components';

import { TalentCardProps, INVITE_TALENT_POPUP_ITEMS } from './types';
import { styles } from './styles';

export const TalentCard = ({
  talent,
  isInvited = false,
  variant = 'invite',
  isAddedToList = false,
  onMenuSelect,
  onPressActionButton,
}: TalentCardProps) => {
  const { name, location, flag, avatarUrl } = talent;
  const { showPopup } = usePopupMenu();

  const isCompleted = variant === 'invite' ? isInvited : isAddedToList;
  const buttonTitle = variant === 'invite' ? 'Invite' : 'Add';

  const handleOpenMenu = (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;

    showPopup({
      items: INVITE_TALENT_POPUP_ITEMS,
      position: { x: pageX, y: pageY },
      onSelect: onMenuSelect,
    });
  };

  return (
    <View style={styles.container}>
      <Avatar size={48} name={name} flag={flag} uri={avatarUrl} />

      <View style={styles.infoContainer}>
        <AppText typography="bold_14">{name}</AppText>
        <AppText typography="regular_12" color="black_60">
          {location}
        </AppText>
      </View>

      {isCompleted ? (
        <IconButton
          style={styles.invitedIcon}
          icon={ICONS.checked('green')}
          iconSize={14}
        />
      ) : (
        <AppButton
          title={buttonTitle}
          onPress={onPressActionButton}
          size="36"
          width={71}
        />
      )}

      <IconButton
        icon={ICONS.dotsVertical()}
        iconSize={24}
        onPress={handleOpenMenu}
      />
    </View>
  );
};
