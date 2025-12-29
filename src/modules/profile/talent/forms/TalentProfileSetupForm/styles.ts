import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  physicalDetailsContainer: {
    gap: 16,
    marginTop: 24,
  },
  photoContainer: {
    width: 167,
    height: 210,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 32,
  },
  cameraContainer: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    backgroundColor: COLORS.white,
    borderRadius: 100,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesPicker: {
    marginTop: 32,
  },
  subcategoriesPicker: {
    marginTop: 24,
  },
  tagsPicker: {
    marginTop: 24,
  },
  manScan: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  additionalSkills: {
    marginTop: 24,
  },
});
