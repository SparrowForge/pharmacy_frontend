// hooks/useThanas.ts

import { useCallback } from "react";

import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { thanaService } from "../services/thana.service";

import {
  fetchThanasStart,
  fetchThanasSuccess,
  fetchThanasFailure,
  createThanaStart,
  createThanaSuccess,
  createThanaFailure,
  fetchSingleThanaStart,
  fetchSingleThanaSuccess,
  fetchSingleThanaFailure,
  updateThanaStart,
  updateThanaSuccess,
  updateThanaFailure,
  deleteThanaStart,
  deleteThanaSuccess,
  deleteThanaFailure,
} from "../redux/features/thanas/thanaSlice";

import { IUpdateThanaPayload } from "../types/thana.types";

export const useThanas = () => {
  const dispatch = useAppDispatch();

  const thanaState = useAppSelector((state) => state.thanas);

  /* ================= FETCH ================= */

  const fetchThanas = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchThanasStart());

        const res = await thanaService.getAllThanas({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchThanasSuccess(res));
      } catch (error: any) {
        dispatch(
          fetchThanasFailure(
            error?.response?.data?.message || "Failed to fetch thanas",
          ),
        );
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */

  const createThana = useCallback(
    async (payload: any) => {
      try {
        dispatch(createThanaStart());

        const res = await thanaService.createThanaService(payload);

        dispatch(createThanaSuccess(res));

        toast.success("Thana created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create thana";

        dispatch(createThanaFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= GET SINGLE ================= */

  const fetchSingleThana = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleThanaStart());

        const res = await thanaService.getSingleThanaService(id);

        dispatch(fetchSingleThanaSuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch thana";

        dispatch(fetchSingleThanaFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */

  const updateThana = useCallback(
    async (id: string, payload: IUpdateThanaPayload) => {
      try {
        dispatch(updateThanaStart());

        const res = await thanaService.updateThanaService(id, payload);

        dispatch(updateThanaSuccess(res));

        toast.success("Thana updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to update thana";

        dispatch(updateThanaFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */

  const deleteThana = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteThanaStart());

        const res = await thanaService.deleteThanaService(id);

        dispatch(deleteThanaSuccess(id));

        toast.success(res?.message || "Thana deleted successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to delete thana";

        dispatch(deleteThanaFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchThanas,
    createThana,
    fetchSingleThana,
    updateThana,
    deleteThana,

    ...thanaState,
  };
};
