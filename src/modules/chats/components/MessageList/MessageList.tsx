import { useRef } from 'react';
import { View, SectionList, ActivityIndicator } from 'react-native';
import { AppText } from '@ui';
import { COLORS } from '@styles';

import { IMessageData, Message } from '../../ui';
import { getMessagePosition } from '../../helpers';
import { styles } from './styles';
import {
  IMessageSection,
  IMessageListProps,
  IMessageRenderItemProps,
} from './types';
import { useAutoScrollOnNewMessage } from './useAutoScrollOnNewMessage';

export const MessageList = ({
  sections,
  isLoading,
  chatType,
  isTalent,
  onEndReached,
  onEndReachedThreshold = 0.2,
}: IMessageListProps) => {
  const sectionListRef = useRef<SectionList<
    IMessageData,
    IMessageSection
  > | null>(null);

  useAutoScrollOnNewMessage({ sections, listRef: sectionListRef });

  const renderMessage = ({ item, index, section }: IMessageRenderItemProps) => {
    const { isFirst, isLast } = getMessagePosition(section.data, index);
    return (
      <Message
        message={item}
        isTalent={isTalent}
        chatType={chatType}
        isFirst={isFirst}
        isLast={isLast}
      />
    );
  };

  const renderSectionHeader = ({ section }: { section: IMessageSection }) => (
    <View style={styles.sectionHeader}>
      <AppText typography="regular_12" color="gray_primary">
        {section.title}
      </AppText>
    </View>
  );

  const ListEmptyComponent = isLoading ? (
    <ActivityIndicator size="small" color={COLORS.black} style={{ flex: 1 }} />
  ) : (
    <AppText renderIf={!isLoading} typography="medium_14" color="gray">
      No messages
    </AppText>
  );

  return (
    <SectionList
      ref={sectionListRef}
      style={styles.list}
      sections={sections}
      inverted
      initialNumToRender={20}
      keyExtractor={item => item.id}
      renderItem={renderMessage}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      renderSectionFooter={renderSectionHeader}
      contentContainerStyle={[
        styles.contentContainer,
        !sections.length && styles.centeredContainer,
      ]}
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
      }}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};
