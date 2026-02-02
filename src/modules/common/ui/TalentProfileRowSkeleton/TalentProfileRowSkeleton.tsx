import { View } from 'react-native';
import { Skeleton } from '@components';
import { styles } from './styles';

export const TalentsListSkeleton = () => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index}>
          <View style={styles.card} />
        </Skeleton>
      ))}
    </View>
  );
};
