export interface IMediaFile {
  id: string;

  file_name: string;
  file_url: string;
  file_type: string;
  mime_type: string;

  file_size: string | number;
  alt_text: string;

  uploaded_by: string;

  created_at: string;
  updated_at: string;

  is_delete: boolean;
}

/* CREATE PAYLOAD */
export interface ICreateMediaFilePayload {
  file_name: string;
  file_url: string;
  file_type: string;
  mime_type: string;
  file_size: number;
  alt_text: string;
  uploaded_by: string | undefined;
}

/* DELETE RESPONSE */
export interface IDeleteMediaFileResponse {
  success: boolean;
  message: string;
  id: string;
}
