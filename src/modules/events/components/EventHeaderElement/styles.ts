import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 50,
  },
  textContainer: {
    flex: 1,
  },
  image: {
    width: 69,
    height: 69,
    borderRadius: 5,
    overflow: 'hidden',
  },
});
