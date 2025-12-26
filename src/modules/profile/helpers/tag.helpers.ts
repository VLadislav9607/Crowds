import { CATEGORY_TAGS, Category, TagValue } from '../types';

export const getTagsForCategories = (categories: Category[]): TagValue[] => {
  const tagSet = new Set<TagValue>();
  categories.forEach(category => {
    CATEGORY_TAGS[category]?.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet);
};

export const filterTagsByCategories = (
  tags: TagValue[],
  categories: Category[],
): TagValue[] => {
  const validTags = getTagsForCategories(categories);
  return tags.filter(tag => validTags.includes(tag));
};

export const getTagOptions = (categories: Category[]) => {
  const availableTags = getTagsForCategories(categories);
  return availableTags.map(tag => ({
    label: formatTagLabel(tag),
    value: tag,
  }));
};

const formatTagLabel = (tag: TagValue): string => {
  return tag
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
