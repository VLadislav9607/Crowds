import { TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { AppText } from '@ui';
import { TagsPickerProps } from './types';
import { If, Skeleton } from '@components';
import { TagsPickerModal, TagsPickerModalRef } from '@modules/common';
import { useMemo, useRef } from 'react';
import { getTagOptions, TagValue } from '@modules/profile';

export const TagsPicker = ({
  selectedCategories,
  selectedTags = [],
  containerStyle,
  onTagsChange,
  onTagPress,
  categoriesContainerStyle,
}: TagsPickerProps) => {
  const tagsPickerModalRef = useRef<TagsPickerModalRef>(null);

  const tagOptions = useMemo(
    () => getTagOptions(selectedCategories),
    [selectedCategories],
  );

  const visibleTags = tagOptions.slice(0, 8);
  const hasMoreTags = tagOptions.length > 8;

  const handleItemPress = (tagValue: TagValue) => {
    onTagPress?.(tagValue);

    if (onTagsChange) {
      if (selectedTags.includes(tagValue)) {
        const filteredValues = selectedTags.filter(v => v !== tagValue);
        onTagsChange(filteredValues);
      } else {
        const newValues = [...selectedTags, tagValue];
        onTagsChange(newValues);
      }
    }
  };

  const isLoading = false;
  const hasTags = tagOptions.length > 0;

  if (!hasTags) {
    return null;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        <AppText typography="semibold_18">Tags</AppText>
        <If condition={hasMoreTags}>
          <TouchableOpacity
            onPress={() =>
              tagsPickerModalRef.current?.open({
                defaultTags: selectedTags,
                onTagsChange,
                tagOptions,
              })
            }
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <If condition={!isLoading}>
              <AppText typography="bold_14" color="main">
                View More
              </AppText>
            </If>
          </TouchableOpacity>
        </If>
      </View>

      <If condition={!isLoading}>
        <View style={[styles.categoriesContainer, categoriesContainerStyle]}>
          {visibleTags.map(tag => {
            const isSelected = selectedTags.includes(tag.value);
            return (
              <TouchableOpacity
                onPress={() => handleItemPress(tag.value)}
                key={tag.value}
                style={[styles.item, isSelected && styles.itemSelected]}
                activeOpacity={0.5}
              >
                <AppText
                  typography="regular_14"
                  color={isSelected ? 'white' : 'black'}
                >
                  {tag.label}
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

      <TagsPickerModal ref={tagsPickerModalRef} />
    </View>
  );
};
