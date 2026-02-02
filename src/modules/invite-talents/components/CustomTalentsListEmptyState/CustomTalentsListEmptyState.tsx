import { View } from 'react-native';
import { AppButton, AppText } from '@ui';
import { ICONS } from '@assets';
import { goToScreen, Screens } from '@navigation';
import { styles } from './styles';

interface CustomTalentsListEmptyStateProps {
  eventId: string;
  listId: string;
  listName: string;
}

export const CustomTalentsListEmptyState = ({
  eventId,
  listId,
  listName,
}: CustomTalentsListEmptyStateProps) => {
  return (
    <View style={styles.container}>
      <AppText typography="regular_14" color="gray_primary">
        No talents added to the list
      </AppText>
      <AppButton
        title="Add Talents"
        icon={ICONS.plus('white')}
        onPress={() =>
          goToScreen(Screens.AddTalentsToList, {
            eventId,
            listId,
            listName,
          })
        }
        width={186}
      />
    </View>
  );
};
