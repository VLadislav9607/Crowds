import { AppText } from '@ui';
import { styles } from './styles';
import { View } from 'react-native';

export const HQBadge = () => {
  return (
    <View style={styles.hqBadge}>
      <AppText typography="bold_12" color="white">
        HQ
      </AppText>
    </View>
  );
};

export const OPSBadge = () => {
  return (
    <View style={styles.opsBadge}>
      <AppText typography="bold_12" color="white">
        OPS
      </AppText>
    </View>
  );
};
