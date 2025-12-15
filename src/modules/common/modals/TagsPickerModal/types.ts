import { ImperativeModalRef } from '@hooks';

export interface TagsPickerModalProps {
  defaultTags?: string[];
  onTagsChange?: (tags: string[]) => void;
}

export type TagsPickerModalRef = ImperativeModalRef<TagsPickerModalProps>;
