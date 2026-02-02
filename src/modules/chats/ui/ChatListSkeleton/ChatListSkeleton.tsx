import { View } from 'react-native';
import { Skeleton } from '@components';
import { styles } from './styles';

export const ChatListSkeleton = () => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index}>
          <View style={styles.card}>
            <Skeleton.Item width={40} height={40} borderRadius={20} />
            <View style={styles.content}>
              <Skeleton.Item width="70%" height={14} borderRadius={4} />
              <Skeleton.Item width="50%" height={12} borderRadius={4} marginTop={6} />
            </View>
          </View>
        </Skeleton>
      ))}
    </View>
  );
};
