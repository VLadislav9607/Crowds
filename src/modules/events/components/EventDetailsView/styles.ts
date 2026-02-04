import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  // EventDetailsCardWithMap
  cardWithMapContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray_100,
    borderRadius: 10,
    padding: 16,
  },
  cardWithMapIconsRow: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  cardWithMapLastIconsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapImage: {
    height: 120,
    borderRadius: 10,
    marginTop: 12,
  },

  // EventDetailsCardWithoutMap
  cardWithoutMapContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray_100,
    borderRadius: 10,
    backgroundColor: COLORS.gray_200,
    padding: 16,
  },
  rowContainerWithMargin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  // EventDetailsRequirements
  requirementsContainer: {
    gap: 24,
  },
  requirementsItems: {
    gap: 6,
  },
  requirementsItemRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },

  // EventDetailsTags
  tagsContainer: {
    gap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagItem: {
    height: 30,
    borderRadius: 100,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray,
  },

  // Common styles
  divider: {
    height: 1,
    backgroundColor: COLORS.black_10,
    marginVertical: 12,
  },
  flex1: {
    flex: 1,
  },
  cardWithoutMapContent: {
    gap: 5,
  },
  tagsContainerSkeleton: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  groupDetailsContainer: {
    borderWidth: 1,
    gap: 20,
    borderRadius: 20,
    borderColor: COLORS.light_gray3,
    padding: 16,
  },
  groupDetailsPreferencesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rotateIcon: {
    transform: [{ rotate: '180deg' }],
  },
});
