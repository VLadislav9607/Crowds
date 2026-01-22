import { GestureResponderEvent, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { AppText, IconButton } from '@ui';
import { ICONS } from '@assets';
import { IPopupMenuItem, usePopupMenu } from '@components';

import { CustomTalentsListCardProps, POPUP_ITEMS_CUSTOM_LIST_CARD } from './types';
import { styles } from './styles';


export const CustomTalentsListCard = ({
  listName,
  countTalents,
  onPress,
  onMenuSelect,
  listId: _listId,
  eventId: _eventId,
}: CustomTalentsListCardProps) => {

  const { showPopup } = usePopupMenu();

  const handleOpenMenu = (event: GestureResponderEvent) => {
    const { pageX, pageY } = event.nativeEvent;

    showPopup({
      items: POPUP_ITEMS_CUSTOM_LIST_CARD,
      position: { x: pageX, y: pageY },
        onSelect: (item: IPopupMenuItem) => onMenuSelect(item.value),
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.infoContainer}>
        <AppText typography="h6" numberOfLines={2}>
          {listName}
        </AppText>

        <AppText typography="regular_14" color="gray_primary">
          {countTalents} people
        </AppText>
      </View>

      <SvgXml xml={ICONS.chevronRight('black_80')} width={20} height={20} />

      <IconButton
        icon={ICONS.dotsVertical()}
        iconSize={24}
        onPress={handleOpenMenu}
      />
    </TouchableOpacity>
  );
};
