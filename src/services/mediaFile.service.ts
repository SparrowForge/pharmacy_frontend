import axiosInstance from "./axios";

import {
  ICreateMediaFilePayload,
  IDeleteMediaFileResponse,
  IMediaFile,
} from "@/src/types/mediaFile.types";

/* CREATE MEDIA FILE */
const createMediaFile = async (
  payload: ICreateMediaFilePayload,
): Promise<IMediaFile> => {
  const res = await axiosInstance.post("/media_files", payload);
  return res.data;
};

/* GET SINGLE MEDIA FILE */
const getMediaFile = async (id: string): Promise<IMediaFile> => {
  const res = await axiosInstance.get(`/media_files/${id}`);
  return res.data;
};

/* DELETE MEDIA FILE */
const deleteMediaFile = async (
  id: string,
): Promise<IDeleteMediaFileResponse> => {
  const res = await axiosInstance.delete(`/media_files/${id}`);
  return res.data;
};

export const mediaFileService = {
  createMediaFile,
  getMediaFile,
  deleteMediaFile,
};
