import { StyleSheet, View } from 'react-native';
import { AppText } from '@ui';
import { APP_ENV } from '@env';

export const TestBadge = () => {
  if (APP_ENV === 'production') return null;

  return (
    <View style={styles.badge}>
      <AppText typography="bold_12" color="white">
        TEST
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#E00252',
    paddingVertical: 2,
    zIndex: 999,
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
});
