import { COLORS } from '@styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: -35,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-end',
  },
  imageWrapper: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4.16 },
    shadowOpacity: 0.25,
    shadowRadius: 10.4,
    elevation: 5,
    
  },
  image: {
    width: 148,
    height: 148,
    backgroundColor: COLORS.gray_bg,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
});
