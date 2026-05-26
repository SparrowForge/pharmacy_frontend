
import { useCallback } from "react";

import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { routeService } from "../services/route.service";

import {
  fetchRoutesStart,
  fetchRoutesSuccess,
  fetchRoutesFailure,
  createRouteStart,
  createRouteSuccess,
  createRouteFailure,
  fetchSingleRouteStart,
  fetchSingleRouteSuccess,
  fetchSingleRouteFailure,
  updateRouteStart,
  updateRouteSuccess,
  updateRouteFailure,
  deleteRouteStart,
  deleteRouteSuccess,
  deleteRouteFailure,
} from "../redux/features/routes/routeSlice";

import { IUpdateRoutePayload } from "../types/route.types";

export const useRoutes = () => {
  const dispatch = useAppDispatch();

  const routeState = useAppSelector((state) => state.routes);

  /* ================= FETCH ================= */

  const fetchRoutes = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchRoutesStart());

        const res = await routeService.getAllRoutes({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",
          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchRoutesSuccess(res));
      } catch (error: any) {
        dispatch(
          fetchRoutesFailure(
            error?.response?.data?.message || "Failed to fetch routes",
          ),
        );
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */

  const createRoute = useCallback(
    async (payload: any) => {
      try {
        dispatch(createRouteStart());

        const res = await routeService.createRouteService(payload);

        dispatch(createRouteSuccess(res));

        toast.success("Route created successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create route";

        dispatch(createRouteFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= GET SINGLE ================= */

  const fetchSingleRoute = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleRouteStart());

        const res = await routeService.getSingleRouteService(id);

        dispatch(fetchSingleRouteSuccess(res));

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to fetch route";

        dispatch(fetchSingleRouteFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */

  const updateRoute = useCallback(
    async (id: string, payload: IUpdateRoutePayload) => {
      try {
        dispatch(updateRouteStart());

        const res = await routeService.updateRouteService(id, payload);

        dispatch(updateRouteSuccess(res));

        toast.success("Route updated successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to update route";

        dispatch(updateRouteFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */

  const deleteRoute = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteRouteStart());

        const res = await routeService.deleteRouteService(id);

        dispatch(deleteRouteSuccess(id));

        toast.success(res?.message || "Route deleted successfully");

        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to delete route";

        dispatch(deleteRouteFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  return {
    fetchRoutes,
    createRoute,
    fetchSingleRoute,
    updateRoute,
    deleteRoute,

    ...routeState,
  };
};
