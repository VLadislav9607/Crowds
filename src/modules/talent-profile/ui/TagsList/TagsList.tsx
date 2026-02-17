import { View } from 'react-native';
import { AppText } from '@ui';

import { styles } from './styles';

interface TagsListProps {
  tags: string[];
}

export const TagsList = ({ tags }: TagsListProps) => {
  return (
    <View style={styles.container}>
      {tags.map((tag, index) => (
        <View key={index} style={styles.tag}>
          <AppText typography="semibold_12">{tag.toUpperCase()}</AppText>
        </View>
      ))}
    </View>
  );
};
