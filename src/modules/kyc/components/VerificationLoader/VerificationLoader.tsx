import { View, ActivityIndicator } from 'react-native';
import { AppText } from '@ui';
import { COLORS } from '@styles';

import { styles } from './styles';

export const VerificationLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.main} />
      <AppText typography="medium_16" color="gray_primary">
        Completing verification...
      </AppText>
    </View>
  );
};
