// hooks/useZones.ts

import { useCallback } from "react";

import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { zoneService } from "../services/zone.service";

import {
  fetchZonesStart,
  fetchZonesSuccess,
  fetchZonesFailure,
  createZoneStart,
  createZoneSuccess,
  createZoneFailure,
  fetchSingleZoneStart,
  fetchSingleZoneSuccess,
  fetchSingleZoneFailure,
  updateZoneStart,
  updateZoneSuccess,
  updateZoneFailure,
  deleteZoneStart,
  deleteZoneSuccess,
  deleteZoneFailure,
} from "../redux/features/zone/zoneSlice";

import { IUpdateZonePayload } from "../types/zone.types";

export const useZones = () => {
  const dispatch = useAppDispatch();

  const zoneState = useAppSelector((state) => state.zones);

  /* ================= FETCH ================= */

  const fetchZones = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchZonesStart());

        const res = await zoneService.getAllZones({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchZonesSuccess(res));
      } catch (error: any) {
        dispatch(
          fetchZonesFailure(
            error?.response?.data?.message || "Failed to fetch zones",
          ),
        );
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */

  const createZone = useCallback(
    async (payload: any) => {
      try {
        dispatch(createZoneStart());

        const res = await zoneService.createZoneService(payload);

        dispatch(createZoneSuccess(res));

        toast.success("Zone created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create zone";

        dispatch(createZoneFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= GET SINGLE ================= */

  const fetchSingleZone = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleZoneStart());

        const res = await zoneService.getSingleZoneService(id);

        dispatch(fetchSingleZoneSuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch zone";

        dispatch(fetchSingleZoneFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */

  const updateZone = useCallback(
    async (id: string, payload: IUpdateZonePayload) => {
      try {
        dispatch(updateZoneStart());

        const res = await zoneService.updateZoneService(id, payload);

        dispatch(updateZoneSuccess(res));

        toast.success("Zone updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to update zone";

        dispatch(updateZoneFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */

  const deleteZone = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteZoneStart());

        const res = await zoneService.deleteZoneService(id);

        dispatch(deleteZoneSuccess(id));

        toast.success(res?.message || "Zone deleted successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to delete zone";

        dispatch(deleteZoneFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchZones,
    createZone,
    fetchSingleZone,
    updateZone,
    deleteZone,

    ...zoneState,
  };
};
