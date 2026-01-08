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
    backgroundColor: '#0000000A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  unreadDot: {
    width: 9,
    height: 9,
    borderRadius: 50,
    backgroundColor: COLORS.main,
  },
  messageText: {
    flex: 1,
  },
  timeTextLastMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 'auto',
    marginTop: 5,
  },
});
