import { View, StyleSheet } from 'react-native';
import { AppText } from '@ui';

export const AvailabilityInfoStep = () => {
  return (
    <View style={styles.container}>
      <AppText typography="regular_16" style={styles.text}>
        Please note you will be able to update your availability in the settings
        area; however your availability allows you to see your jobs based on
        these filters; and or allows entities to search for talent based on
        their availability.
      </AppText>

      <AppText typography="regular_16" style={styles.text}>
        Once you have approved jobs for an upcoming week you wont be able to
        change your availability till that time frame has passed.
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  text: {
    textAlign: 'center',
    lineHeight: 24,
  },
});
