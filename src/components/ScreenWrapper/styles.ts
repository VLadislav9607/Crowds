import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
});

export const getWrapperPaddingBottom = (
  withBottomTabBar: boolean,
  bottom: number,
) => {
  return withBottomTabBar ? 16 : bottom || 16;
};
