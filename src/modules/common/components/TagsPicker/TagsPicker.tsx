import { useRef, useMemo, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { AppText } from '@ui';
import { If, Skeleton } from '@components';
import { useGetEventsTags } from '@actions';
import { TagsPickerModal, TagsPickerModalRef } from '@modules/common';

import { styles } from './styles';
import { TagsPickerProps } from './types';

export const TagsPicker = ({
  title = 'Tags',
  selectedSubcategoryIds,
  selectedTags = [],
  containerStyle,
  onTagsChange,
  onTagPress,
  tagsContainerStyle,
}: TagsPickerProps) => {
  const tagsPickerModalRef = useRef<TagsPickerModalRef>(null);

  const { data, isLoading } = useGetEventsTags(selectedSubcategoryIds);
  const tags = useMemo(() => data?.tags ?? [], [data?.tags]);

  const tagOptions = useMemo(() => {
    return tags.map(tag => ({
      label: tag.title,
      value: tag.id,
    }));
  }, [tags]);

  const visibleTags = tagOptions.slice(0, 8);
  const hasMoreTags = tagOptions.length > 8;

  const handleItemPress = (tagId: string) => {
    onTagPress?.(tagId);

    if (onTagsChange) {
      if (selectedTags.includes(tagId)) {
        const filteredValues = selectedTags.filter(v => v !== tagId);
        onTagsChange(filteredValues);
      } else {
        const newValues = [...selectedTags, tagId];
        onTagsChange(newValues);
      }
    }
  };

  // Auto-cleanup invalid tags when subcategories change
  useEffect(() => {
    if (tags.length === 0) return;

    const validIds = new Set(tags.map(t => t.id));
    const validSelectedTags = selectedTags.filter(id => validIds.has(id));

    if (validSelectedTags.length !== selectedTags.length && onTagsChange) {
      onTagsChange(validSelectedTags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  if (selectedSubcategoryIds.length === 0) {
    return null;
  }

  const renderSkeleton = () => (
    <Skeleton>
      <View style={styles.skeletonContainer}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton.Item
            key={index}
            width={70 + Math.random() * 40}
            height={30}
            borderRadius={100}
          />
        ))}
      </View>
    </Skeleton>
  );

  if (!isLoading && tagOptions.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        <AppText typography="semibold_18">{title}</AppText>
        <If condition={hasMoreTags && !isLoading}>
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
            <AppText typography="bold_14" color="main">
              View More
            </AppText>
          </TouchableOpacity>
        </If>
      </View>

      {isLoading ? (
        renderSkeleton()
      ) : (
        <View style={[styles.categoriesContainer, tagsContainerStyle]}>
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
      )}

      <TagsPickerModal ref={tagsPickerModalRef} />
    </View>
  );
};
