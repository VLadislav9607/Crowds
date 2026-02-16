import { StyleSheet } from 'react-native';
import { COLORS } from '@styles';

export const styles = StyleSheet.create({
  noTeamMembersFound: {
    textAlign: 'center',
    marginBottom: 24,
  },
  title: {
    marginTop: 20,
    marginBottom: 18,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.gray,
    marginHorizontal: 20,
  },
  button: {
    width: 350,
    alignSelf: 'center',
  },
  loader: {
    marginVertical: 40,
  },
  list: {
    marginBottom: 24,
  },
});
