// hooks/useRegions.ts

import { useCallback } from "react";

import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { regionService } from "../services/region.service";

import {
  fetchRegionsStart,
  fetchRegionsSuccess,
  fetchRegionsFailure,

  createRegionStart,
  createRegionSuccess,
  createRegionFailure,

  fetchSingleRegionStart,
  fetchSingleRegionSuccess,
  fetchSingleRegionFailure,

  updateRegionStart,
  updateRegionSuccess,
  updateRegionFailure,

  deleteRegionStart,
  deleteRegionSuccess,
  deleteRegionFailure,
} from "../redux/features/region/regionSlice";

import { IUpdateRegionPayload } from "../types/region.types";

export const useRegions = () => {
  const dispatch = useAppDispatch();

  const regionState = useAppSelector(
    (state) => state.regions,
  );

  /* ================= FETCH ================= */

  const fetchRegions = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchRegionsStart());

        const res = await regionService.getAllRegions({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchRegionsSuccess(res));
      } catch (error: any) {
        dispatch(
          fetchRegionsFailure(
            error?.response?.data?.message ||
              "Failed to fetch regions",
          ),
        );
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */

  const createRegion = useCallback(
    async (payload: any) => {
      try {
        dispatch(createRegionStart());

        const res =
          await regionService.createRegionService(payload);

        dispatch(createRegionSuccess(res));

        toast.success("Region created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to create region";

        dispatch(createRegionFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= GET SINGLE ================= */

  const fetchSingleRegion = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleRegionStart());

        const res =
          await regionService.getSingleRegionService(id);

        dispatch(fetchSingleRegionSuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to fetch region";

        dispatch(fetchSingleRegionFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */

  const updateRegion = useCallback(
    async (
      id: string,
      payload: IUpdateRegionPayload,
    ) => {
      try {
        dispatch(updateRegionStart());

        const res =
          await regionService.updateRegionService(
            id,
            payload,
          );

        dispatch(updateRegionSuccess(res));

        toast.success("Region updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to update region";

        dispatch(updateRegionFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */

  const deleteRegion = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteRegionStart());

        const res =
          await regionService.deleteRegionService(id);

        dispatch(deleteRegionSuccess(id));

        toast.success(
          res?.message || "Region deleted successfully",
        );

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to delete region";

        dispatch(deleteRegionFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchRegions,
    createRegion,
    fetchSingleRegion,
    updateRegion,
    deleteRegion,

    ...regionState,
  };
};