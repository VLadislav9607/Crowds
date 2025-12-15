import { View, SectionList } from 'react-native';

import { AppText } from '@ui';

import { Message } from '../../ui';
import { getMessagePosition } from '../../helpers';
import { styles } from './styles';
import {
  IMessageSection,
  IMessageListProps,
  IMessageRenderItemProps,
} from './types';

export const MessageList = ({ sections }: IMessageListProps) => {
  const renderMessage = ({ item, index, section }: IMessageRenderItemProps) => {
    const { isFirst, isLast } = getMessagePosition(section.data, index);
    return <Message message={item} isFirst={isFirst} isLast={isLast} />;
  };

  const renderSectionHeader = ({ section }: { section: IMessageSection }) => (
    <View style={styles.sectionHeader}>
      <AppText typography="regular_12" color="gray_primary">
        {section.title}
      </AppText>
    </View>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={item => item.id}
      renderItem={renderMessage}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      renderSectionHeader={renderSectionHeader}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
      scrollEnabled={false}
    />
  );
};
