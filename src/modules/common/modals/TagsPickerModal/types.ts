import { ImperativeModalRef } from '@hooks';
import { TagValue } from '@modules/profile';

export interface TagOption {
  label: string;
  value: TagValue;
}

export interface TagsPickerModalProps {
  defaultTags?: TagValue[];
  tagOptions?: TagOption[];
  onTagsChange?: (tags: TagValue[]) => void;
}

export type TagsPickerModalRef = ImperativeModalRef<TagsPickerModalProps>;
