export interface SubmitTaskPhotoBodyDto {
  participation_id: string;
  photo_path: string;
}

export interface SubmitTaskPhotoRespDto {
  id: string;
  participation_id: string;
  photo_path: string;
  status: string;
  submitted_at: string;
}
