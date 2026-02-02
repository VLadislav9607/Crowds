import { DIMENSIONS } from '@constants';
import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  saveButtonWrapper: {
    width: DIMENSIONS.width - 40,
    marginHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logoDescription: {
    textAlign: 'center',
  },
  logoImage: {
    width: 149,
    height: 149,
    borderRadius: 10,
  },
  imageContainer: {
    width: 149,
    height: 149,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray_bg,
    overflow: 'hidden',
  },
  cameraWrapper: {
    width: 22,
    height: 22,
    borderRadius: 100,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 6,
    right: 6,
  },
});
