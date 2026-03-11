import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 6,
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
    margin: 4,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  title: {
    textTransform: 'uppercase',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerContent: {
    gap: 8,
    flex: 1,
  },
});
