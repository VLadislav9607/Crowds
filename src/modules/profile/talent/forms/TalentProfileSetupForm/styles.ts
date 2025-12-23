import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  physicalDetailsContainer: {
    gap: 16,
  },
  photoContainerWrapper: {
    width: 167
  },
  photoContainer: {
    width: 167,
    height: 210,
    borderRadius: 10,
    overflow: 'hidden',
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
  tagsPicker: {
    marginTop: 32,
  },
  manScan: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  additionalSkills: {
    marginVertical: 32,
  },
});
