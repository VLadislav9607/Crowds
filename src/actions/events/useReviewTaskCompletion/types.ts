export interface ReviewTaskCompletionBodyDto {
  task_completion_id: string;
  status: 'approved' | 'rejected';
}

export interface ReviewTaskCompletionRespDto {
  success: boolean;
  status: string;
}
