import { ImperativeModalRef } from '@hooks';

export interface TagOption {
  label: string;
  value: string;
}

export interface TagsPickerModalProps {
  defaultTags?: string[];
  tagOptions?: TagOption[];
  onTagsChange?: (tags: string[]) => void;
}

export type TagsPickerModalRef = ImperativeModalRef<TagsPickerModalProps>;
