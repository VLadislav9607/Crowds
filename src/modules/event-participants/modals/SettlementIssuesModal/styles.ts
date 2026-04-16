import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.orange + '20',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 14,
  },
  description: {
    textAlign: 'center',
    marginBottom: 14,
  },
  talentsList: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  talentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    backgroundColor: COLORS.white,
  },
  talentRowBorder: {
    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.red + '12',
    alignItems: 'center',
    justifyContent: 'center',
  },
  talentInfo: {
    flex: 1,
  },
  reasonPill: {
    marginTop: 3,
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: COLORS.red + '12',
  },
  successNote: {
    marginTop: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.green + '12',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btn: {
    marginTop: 20,
  },
});
