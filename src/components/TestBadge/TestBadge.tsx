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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E00252',
    paddingVertical: 2,
    alignItems: 'center',
    zIndex: 999,
  },
});
