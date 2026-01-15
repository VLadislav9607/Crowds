import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 20,
  },
  footerLoader: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyList: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noEventsContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonListContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  skeletonItemsContainer: {
    gap: 9,
    width: '100%',
  },
});
