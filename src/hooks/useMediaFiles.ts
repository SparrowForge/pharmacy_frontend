import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { toast } from "sonner";

import { mediaFileService } from "@/src/services/mediaFile.service";
import {
  createMediaStart,
  createMediaSuccess,
  createMediaFailure,

  fetchMediaStart,
  fetchMediaSuccess,
  fetchMediaFailure,

  deleteMediaStart,
  deleteMediaSuccess,
  deleteMediaFailure,
} from "@/src/redux/features/media-files/mediaFileSlice";

import { ICreateMediaFilePayload } from "@/src/types/mediaFile.types";

export const useMediaFiles = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.mediaFiles);

  /* CREATE MEDIA */
  const uploadMedia = useCallback(async (payload: ICreateMediaFilePayload) => {
    try {
      dispatch(createMediaStart());

      const res = await mediaFileService.createMediaFile(payload);

      dispatch(createMediaSuccess(res));

      toast.success("File uploaded");

      return res; // 👈 IMPORTANT: this gives you ID
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Upload failed";

      dispatch(createMediaFailure(msg));
      toast.error(msg);

      throw err;
    }
  }, [dispatch]);

  /* GET SINGLE */
  const fetchMedia = useCallback(async (id: string) => {
    try {
      dispatch(fetchMediaStart());

      const res = await mediaFileService.getMediaFile(id);

      dispatch(fetchMediaSuccess(res));

      return res;
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Fetch failed";

      dispatch(fetchMediaFailure(msg));
      toast.error(msg);

      throw err;
    }
  }, [dispatch]);

  /* DELETE */
  const deleteMedia = useCallback(async (id: string) => {
    try {
      dispatch(deleteMediaStart());

      const res = await mediaFileService.deleteMediaFile(id);

      dispatch(deleteMediaSuccess(id));

      toast.success(res?.message || "Deleted");

      return res;
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || "Delete failed";

      dispatch(deleteMediaFailure(msg));
      toast.error(msg);

      throw err;
    }
  }, [dispatch]);

  return {
    ...state,

    uploadMedia,
    fetchMedia,
    deleteMedia,
  };
};