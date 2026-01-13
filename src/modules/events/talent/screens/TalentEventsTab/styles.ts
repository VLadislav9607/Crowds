import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  header: {
    height: 156,
    paddingHorizontal: 0,
    backgroundColor: COLORS.black,
  },
  tabsContainer: {
    paddingHorizontal: 16,
  },
  eventsListContent: {
    paddingTop: 16,
  },
});
