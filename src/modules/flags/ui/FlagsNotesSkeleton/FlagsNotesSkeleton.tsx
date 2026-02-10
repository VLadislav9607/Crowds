import { View } from 'react-native';
import { styles } from './styles';

export const FlagsNotesSkeleton = () => {
  return (
    <View style={styles.container}>
      {[0, 1, 2].map(item => (
        <View key={item} style={styles.card}>
          <View style={styles.row}>
            <View style={styles.dot} />
            <View style={styles.lineShort} />
            <View style={styles.lineShort} />
          </View>
          <View style={styles.lineMedium} />
          <View style={styles.lineLong} />
        </View>
      ))}
    </View>
  );
};
