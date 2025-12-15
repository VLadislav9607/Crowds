import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 20
  },
  itemSeparator: {
    height: 9
  },
  footerLoader: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyList: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  skeletonListContainer: {
    width: '100%',
    paddingHorizontal: 20
  },
  skeletonItemsContainer: {
    gap: 9
  }
});