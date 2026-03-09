import { ScreenWrapper } from '@components';
import { StyleSheet } from 'react-native';

import { MyCustomTalentsLists } from '../../components';

export const MyListsScreen = () => {
  return (
    <ScreenWrapper
      headerVariant="withTitleAndImageBg"
      title="My Lists"
      contentContainerStyle={styles.contentContainer}
    >
      <MyCustomTalentsLists />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 16,
    gap: 14,
  },
});
