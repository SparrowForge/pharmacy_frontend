// hooks/useDivisions.ts

import { useCallback } from "react";

import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { divisionService } from "../services/division.service";

import {
  fetchDivisionsStart,
  fetchDivisionsSuccess,
  fetchDivisionsFailure,
  createDivisionStart,
  createDivisionSuccess,
  createDivisionFailure,
  fetchSingleDivisionStart,
  fetchSingleDivisionSuccess,
  fetchSingleDivisionFailure,
  updateDivisionStart,
  updateDivisionSuccess,
  updateDivisionFailure,
  deleteDivisionStart,
  deleteDivisionSuccess,
  deleteDivisionFailure,
} from "../redux/features/division/divisionSlice";

import { IUpdateDivisionPayload } from "../types/division.types";

export const useDivisions = () => {
  const dispatch = useAppDispatch();

  const divisionState = useAppSelector((state) => state.divisions);

  /* ================= FETCH ================= */

  const fetchDivisions = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchDivisionsStart());

        const res = await divisionService.getAllDivisions({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchDivisionsSuccess(res));
      } catch (error: any) {
        dispatch(
          fetchDivisionsFailure(
            error?.response?.data?.message || "Failed to fetch divisions",
          ),
        );
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */

  const createDivision = useCallback(
    async (payload: any) => {
      try {
        dispatch(createDivisionStart());

        const res = await divisionService.createDivisionService(payload);

        dispatch(createDivisionSuccess(res));

        toast.success("Division created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create division";

        dispatch(createDivisionFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= GET SINGLE ================= */

  const fetchSingleDivision = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleDivisionStart());

        const res = await divisionService.getSingleDivisionService(id);

        dispatch(fetchSingleDivisionSuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch division";

        dispatch(fetchSingleDivisionFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */

  const updateDivision = useCallback(
    async (id: string, payload: IUpdateDivisionPayload) => {
      try {
        dispatch(updateDivisionStart());

        const res = await divisionService.updateDivisionService(id, payload);

        dispatch(updateDivisionSuccess(res));

        toast.success("Division updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to update division";

        dispatch(updateDivisionFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */

  const deleteDivision = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteDivisionStart());

        const res = await divisionService.deleteDivisionService(id);

        dispatch(deleteDivisionSuccess(id));

        toast.success(res?.message || "Division deleted successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to delete division";

        dispatch(deleteDivisionFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchDivisions,
    createDivision,
    fetchSingleDivision,
    updateDivision,
    deleteDivision,

    ...divisionState,
  };
};
