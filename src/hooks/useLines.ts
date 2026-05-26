import { useCallback } from "react";

import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { lineService } from "../services/line.service";

import {
  fetchLinesStart,
  fetchLinesSuccess,
  fetchLinesFailure,
  createLineStart,
  createLineSuccess,
  createLineFailure,
  fetchSingleLineStart,
  fetchSingleLineSuccess,
  fetchSingleLineFailure,
  updateLineStart,
  updateLineSuccess,
  updateLineFailure,
  deleteLineStart,
  deleteLineSuccess,
  deleteLineFailure,
} from "../redux/features/lines/lineSlice";

import { IUpdateLinePayload } from "../types/line.types";

export const useLines = () => {
  const dispatch = useAppDispatch();

  const lineState = useAppSelector((state) => state.lines);

  /* ================= FETCH ================= */

  const fetchLines = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchLinesStart());

        const res = await lineService.getAllLines({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchLinesSuccess(res));
      } catch (error: any) {
        dispatch(
          fetchLinesFailure(
            error?.response?.data?.message || "Failed to fetch lines",
          ),
        );
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */

  const createLine = useCallback(
    async (payload: any) => {
      try {
        dispatch(createLineStart());

        const res = await lineService.createLineService(payload);

        dispatch(createLineSuccess(res));

        toast.success("Line created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create line";

        dispatch(createLineFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= GET SINGLE ================= */

  const fetchSingleLine = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleLineStart());

        const res = await lineService.getSingleLineService(id);

        dispatch(fetchSingleLineSuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch line";

        dispatch(fetchSingleLineFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */

  const updateLine = useCallback(
    async (id: string, payload: IUpdateLinePayload) => {
      try {
        dispatch(updateLineStart());

        const res = await lineService.updateLineService(id, payload);

        dispatch(updateLineSuccess(res));

        toast.success("Line updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to update line";

        dispatch(updateLineFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */

  const deleteLine = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteLineStart());

        const res = await lineService.deleteLineService(id);

        dispatch(deleteLineSuccess(id));

        toast.success(res?.message || "Line deleted successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to delete line";

        dispatch(deleteLineFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchLines,
    createLine,
    fetchSingleLine,
    updateLine,
    deleteLine,

    ...lineState,
  };
};
