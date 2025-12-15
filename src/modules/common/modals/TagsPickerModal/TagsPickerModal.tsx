import { AppModal, If, Skeleton } from '@components';
import { AppButton, AppText } from '@ui';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { TagsPickerModalRef, TagsPickerModalProps } from './types';
import { styles } from './styles';
import { useEffect, useState, forwardRef } from 'react';
import { useImperativeModal } from '@hooks';

export const TagsPickerModal = forwardRef<TagsPickerModalRef>((_, ref) => {
  const { isVisible, refProps, close } = useImperativeModal<TagsPickerModalProps>(ref, {
    onRefClose: () => {
      setSelectedTags([]);
    },
  });

  const [selectedTags, setSelectedTags] = useState<string[]>(refProps?.defaultTags || []);

  const isLoading = false;

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
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const onClearAll = () => setSelectedTags([]);

  const handleContinue = () => {
    refProps?.onTagsChange?.(selectedTags);
    close();
  };

  useEffect(() => {
    if (isVisible) {
      setSelectedTags(refProps?.defaultTags || []);
    }
  }, [refProps?.defaultTags, isVisible]);

  return (
    <AppModal isVisible={isVisible} onClose={close}>
      <View style={styles.container}>
        <View style={styles.headerStyles}>
          <AppText typography="h4">Select Tags</AppText>

          <If condition={!!selectedTags.length && !isLoading}>
            <TouchableOpacity
              onPress={onClearAll}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <AppText typography="bold_14" color="red">
                Clear all
              </AppText>
            </TouchableOpacity>
          </If>
        </View>

        <If condition={!isLoading}>
          <ScrollView contentContainerStyle={styles.categoriesContainer}>
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
          </ScrollView>
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

        <View style={styles.footer}>
          <AppButton
            title="Continue"
            onPress={handleContinue}
            size="50"
            wrapperStyles={styles.footerButton}
          />
          <AppButton
            title="Cancel"
            onPress={close}
            size="50"
            variant="withBorder"
            wrapperStyles={styles.footerButton}
            titleStyles={styles.footerButtonTitle}
          />
        </View>
      </View>
    </AppModal>
  );
});

TagsPickerModal.displayName = 'TagsPickerModal';
