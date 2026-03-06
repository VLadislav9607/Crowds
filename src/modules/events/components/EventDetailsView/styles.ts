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
  mapImage: {
    height: 120,
    borderRadius: 10,
    marginTop: 12,
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

  timeBlock: {
    gap: 8,
    backgroundColor: COLORS.gray_200,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
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
