export interface CustomTask {
  id: string;
  text: string;
  is_completed?: boolean;
}

export interface SystemTaskState {
  checkedInAt: string | null;
  checkedOutAt: string | null;
  taskPhotoPath: string | null;
  isMediaProduction: boolean;
}

export interface EventTasksSectionProps {
  variant: 'talent' | 'org';
  systemTaskState: SystemTaskState;
  customTasks: CustomTask[];
  isCheckedIn?: boolean;
  onToggleCustomTask?: (taskId: string) => void;
  timezone?: string;
}
