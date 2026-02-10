import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  userInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  userDetails: {
    marginLeft: 20,
    gap: 2,
  },
  avatar: {
    overflow: 'hidden',
    borderRadius: 20,
  },
});
