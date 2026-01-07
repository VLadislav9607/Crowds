import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

const BORDER_RADIUS_LARGE = 20;
const BORDER_RADIUS_SMALL = 6;
const AVATAR_SIZE = 20;
const AVATAR_GAP = 8;

export const styles = StyleSheet.create({
  container: {
    marginBottom: 3,
  },
  containerWithTime: {
    marginTop: 12,
    marginBottom: 3,
  },
  timeContainer: {
    alignItems: 'flex-start',
    marginBottom: 6,
    marginLeft: AVATAR_SIZE + AVATAR_GAP,
  },
  timeContainerMe: {
    alignItems: 'flex-end',
    marginLeft: 0,
  },
  timeText: {
    color: COLORS.typography_black,
    opacity: 0.6,
  },
  bubbleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bubbleWrapperMe: {
    justifyContent: 'flex-end',
  },
  avatarContainer: {
    width: AVATAR_SIZE,
    marginRight: AVATAR_GAP,
  },
  avatarPlaceholder: {
    width: AVATAR_SIZE,
    marginRight: AVATAR_GAP,
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    maxWidth: '80%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: COLORS.gray_bg,
    borderTopLeftRadius: BORDER_RADIUS_LARGE,
    borderTopRightRadius: BORDER_RADIUS_LARGE,
    borderBottomLeftRadius: BORDER_RADIUS_LARGE,
    borderBottomRightRadius: BORDER_RADIUS_LARGE,
  },
  bubbleMe: {
    backgroundColor: COLORS.main,
  },

  // ===== OTHER (left side) =====
  bubbleFirstOther: {
    borderTopLeftRadius: BORDER_RADIUS_LARGE,
    borderBottomLeftRadius: BORDER_RADIUS_SMALL,
  },
  bubbleMiddleOther: {
    borderTopLeftRadius: BORDER_RADIUS_SMALL,
    borderBottomLeftRadius: BORDER_RADIUS_SMALL,
  },
  bubbleLastOther: {
    borderTopLeftRadius: BORDER_RADIUS_SMALL,
    borderBottomLeftRadius: BORDER_RADIUS_LARGE,
  },

  // ===== ME (right side) =====
  bubbleFirstMe: {
    borderTopRightRadius: BORDER_RADIUS_LARGE,
    borderBottomRightRadius: BORDER_RADIUS_SMALL,
  },
  bubbleMiddleMe: {
    borderTopRightRadius: BORDER_RADIUS_SMALL,
    borderBottomRightRadius: BORDER_RADIUS_SMALL,
  },
  bubbleLastMe: {
    borderTopRightRadius: BORDER_RADIUS_SMALL,
    borderBottomRightRadius: BORDER_RADIUS_LARGE,
  },
});

