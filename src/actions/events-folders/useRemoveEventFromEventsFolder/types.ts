export interface RemoveEventFromEventsFolderBodyDto {
  folder_id: string;
  event_id: string;
}

export interface RemoveEventFromEventsFolderResDto {
  success: boolean;
}
