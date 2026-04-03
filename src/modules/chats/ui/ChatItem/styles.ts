import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.gray,
    gap: 10,
  },
  containerFirst: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
  },
  containerUnread: {
    backgroundColor: COLORS.main_05,
    marginHorizontal: 0,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
  },
  containerUnreadNotFirst: {
    borderTopWidth: 0,
  },
  containerBeforeUnread: {
    borderBottomWidth: 0,
  },
  eventRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  eventLabel: {
    flex: 1,
    backgroundColor: '#0000000A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  timeText: {
    marginLeft: 'auto',
  },
  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 50,
    backgroundColor: COLORS.main,
  },
  titleText: {
    flex: 1,
  },
  messageText: {
    flex: 1,
  },
});
