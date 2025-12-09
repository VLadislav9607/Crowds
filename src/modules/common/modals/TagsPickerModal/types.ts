import { AppModalProps } from '@components';

export interface TagsPickerModalProps {
  modalProps: AppModalProps;
  defaultTags?: string[];

  onTagsChange?: (tags: string[]) => void;
}
