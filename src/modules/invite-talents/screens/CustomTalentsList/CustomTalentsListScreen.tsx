import { ScreenWrapper } from '@components';
import { goToScreen, Screens, useScreenNavigation } from '@navigation';
import { AppButton, AppText } from '@ui';
import { View, StyleSheet } from 'react-native';
import { ICONS } from '@assets';

export const CustomTalentsListScreen = () => {
  const { params } = useScreenNavigation<Screens.CustomTalentsList>();

  return (
    <ScreenWrapper headerVariant="withTitleAndImageBg" title={params?.listName}>
      <View style={styles.buttonContainer}>
        <AppText typography="regular_14" color="gray_primary">
          No talents added to the list
        </AppText>
        <AppButton
          title="Add Talents"
          icon={ICONS.plus('white')}
          onPress={() =>
            goToScreen(Screens.AddTalentsToList, {
              listId: params?.listId ?? '',
            })
          }
          width={186}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
