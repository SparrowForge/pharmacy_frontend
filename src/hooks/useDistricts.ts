// hooks/useDistricts.ts

import { useCallback } from "react";

import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { districtService } from "../services/districts.service";

import {
  fetchDistrictsStart,
  fetchDistrictsSuccess,
  fetchDistrictsFailure,

  createDistrictStart,
  createDistrictSuccess,
  createDistrictFailure,

  fetchSingleDistrictStart,
  fetchSingleDistrictSuccess,
  fetchSingleDistrictFailure,

  updateDistrictStart,
  updateDistrictSuccess,
  updateDistrictFailure,

  deleteDistrictStart,
  deleteDistrictSuccess,
  deleteDistrictFailure,
} from "../redux/features/districts/districtSlice";

import { IUpdateDistrictPayload } from "../types/districts.types";

export const useDistricts = () => {
  const dispatch = useAppDispatch();

  const districtState = useAppSelector(
    (state) => state.districts,
  );

  /* ================= FETCH ================= */

  const fetchDistricts = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchDistrictsStart());

        const res = await districtService.getAllDistricts({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchDistrictsSuccess(res));
      } catch (error: any) {
        dispatch(
          fetchDistrictsFailure(
            error?.response?.data?.message ||
              "Failed to fetch districts",
          ),
        );
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */

  const createDistrict = useCallback(
    async (payload: any) => {
      try {
        dispatch(createDistrictStart());

        const res =
          await districtService.createDistrictService(
            payload,
          );

        dispatch(createDistrictSuccess(res));

        toast.success("District created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to create district";

        dispatch(createDistrictFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= GET SINGLE ================= */

  const fetchSingleDistrict = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleDistrictStart());

        const res =
          await districtService.getSingleDistrictService(
            id,
          );

        dispatch(fetchSingleDistrictSuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to fetch district";

        dispatch(fetchSingleDistrictFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */

  const updateDistrict = useCallback(
    async (
      id: string,
      payload: IUpdateDistrictPayload,
    ) => {
      try {
        dispatch(updateDistrictStart());

        const res =
          await districtService.updateDistrictService(
            id,
            payload,
          );

        dispatch(updateDistrictSuccess(res));

        toast.success("District updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to update district";

        dispatch(updateDistrictFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */

  const deleteDistrict = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteDistrictStart());

        const res =
          await districtService.deleteDistrictService(id);

        dispatch(deleteDistrictSuccess(id));

        toast.success(
          res?.message || "District deleted successfully",
        );

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          "Failed to delete district";

        dispatch(deleteDistrictFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchDistricts,
    createDistrict,
    fetchSingleDistrict,
    updateDistrict,
    deleteDistrict,

    ...districtState,
  };
};