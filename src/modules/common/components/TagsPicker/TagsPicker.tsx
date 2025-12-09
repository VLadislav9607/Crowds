import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { AppText } from '@ui';
import { TagsPickerProps } from './types';
import { If, Skeleton } from '@components';
import { TagsPickerModal } from '@modules/common';
import { useBoolean } from '@hooks';

export const TagsPicker = ({
  selectedTags = [],
  containerStyle,
  onTagsChange,
  onTagPress,
}: TagsPickerProps) => {
  const { value: isTagsPickerModalVisible, toggle: toggleTagsPickerModal } =
    useBoolean(false);

  const tags = [
    'Tag 1',
    'Tag 2',
    'Tag 3',
    'Tag 4',
    'Tag 5',
    'Tag 6',
    'Tag 7',
    'Tag 8',
  ];

  const handleItemPress = (tag: string) => {
    onTagPress?.(tag);

    if (onTagsChange) {
      if (selectedTags.includes(tag)) {
        const filteredValues = selectedTags.filter(v => v !== tag);
        onTagsChange(filteredValues);
      } else {
        const newValues = [...selectedTags, tag];
        onTagsChange(newValues);
      }
    }
  };

  const isLoading = false;
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        <AppText typography="semibold_18">Tags</AppText>
        <TouchableOpacity
          onPress={toggleTagsPickerModal}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <If condition={!isLoading}>
            <AppText typography="bold_14" color="main">
              View More
            </AppText>
          </If>
        </TouchableOpacity>
      </View>

      <If condition={!isLoading}>
        <View style={styles.categoriesContainer}>
          {tags.map(tag => {
            const isSelected = selectedTags.includes(tag);
            return (
              <TouchableOpacity
                onPress={() => handleItemPress(tag)}
                key={tag}
                style={[styles.item, isSelected && styles.itemSelected]}
                activeOpacity={0.5}
              >
                <AppText
                  typography="regular_14"
                  color={isSelected ? 'white' : 'black'}
                >
                  {tag}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>
      </If>

      <If condition={isLoading}>
        <Skeleton>
          <Skeleton.Item style={styles.skeletonContainer}>
            <Skeleton.Item width={100} height={30} borderRadius={100} />
            <Skeleton.Item width={80} height={30} borderRadius={100} />
            <Skeleton.Item width={93} height={30} borderRadius={100} />
            <Skeleton.Item width={97} height={30} borderRadius={100} />
            <Skeleton.Item width={79} height={30} borderRadius={100} />
            <Skeleton.Item width={82} height={30} borderRadius={100} />
            <Skeleton.Item width={80} height={30} borderRadius={100} />
            <Skeleton.Item width={93} height={30} borderRadius={100} />
            <Skeleton.Item width={97} height={30} borderRadius={100} />
          </Skeleton.Item>
        </Skeleton>
      </If>

      <TagsPickerModal
        modalProps={{
          isVisible: isTagsPickerModalVisible,
          onClose: toggleTagsPickerModal,
        }}
        defaultTags={selectedTags}
        onTagsChange={onTagsChange}
      />

      {/* TODO: Add more tags */}
    </View>
  );
};
