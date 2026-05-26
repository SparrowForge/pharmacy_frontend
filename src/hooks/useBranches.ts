import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import {
  fetchBranchesStart,
  fetchBranchesSuccess,
  fetchBranchesFailure,
  createBranchStart,
  createBranchSuccess,
  createBranchFailure,
  fetchSingleBranchStart,
  fetchSingleBranchSuccess,
  fetchSingleBranchFailure,
  updateBranchStart,
  updateBranchSuccess,
  updateBranchFailure,
  deleteBranchStart,
  deleteBranchSuccess,
  deleteBranchFailure,
} from "@/src/redux/features/branch/branchSlice";
import { branchService } from "../services/branch.service";
import {
  ICreateBranchPayload,
  IUpdateBranchPayload,
} from "../types/branch.types";
import { toast } from "sonner";

export const useBranches = () => {
  const dispatch = useAppDispatch();
  const branchState = useAppSelector((state) => state.branch);

  /* ================= FETCH ================= */
  const fetchBranches = useCallback(
    async (params?: {
      page?: number;
      limit?: number;
      q?: string;
      shop_id?: string;
      includeDeleted?: boolean;
    }) => {
      try {
        dispatch(fetchBranchesStart());

        const res = await branchService.getAllBranches({
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          q: params?.q ?? "",

          includeDeleted: params?.includeDeleted ?? false,
        });

        dispatch(fetchBranchesSuccess(res));
      } catch (error: any) {
        dispatch(
          fetchBranchesFailure(
            error?.response?.data?.message || "Failed to fetch branches",
          ),
        );
      }
    },
    [dispatch],
  );

  /* ================= CREATE ================= */
  const createBranch = useCallback(
    async (payload: ICreateBranchPayload) => {
      try {
        dispatch(createBranchStart());
        const res = await branchService.createBranchService(payload);
        dispatch(createBranchSuccess(res));
        toast.success("Branch created successfully");
        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to create branch";
        dispatch(createBranchFailure(message));
        toast.error(message);
        throw error;
      }
    },
    [dispatch],
  );

  /* ================= GET SINGLE ================= */
  const getSingleBranch = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleBranchStart());
        const response = await branchService.getSingleBranch(id);
        dispatch(fetchSingleBranchSuccess(response));
        return response;
      } catch (error: any) {
        dispatch(
          fetchSingleBranchFailure(
            error?.response?.data?.message || "Failed to fetch branch",
          ),
        );
        throw error;
      }
    },
    [dispatch],
  );

  const updateBranch = useCallback(
    async (id: string, payload: IUpdateBranchPayload) => {
      try {
        dispatch(updateBranchStart());
        const res = await branchService.updateBranchService(id, payload);
        dispatch(updateBranchSuccess(res));
        toast.success("Branch updated successfully");
        return res;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to update branch";
        dispatch(updateBranchFailure(message));
        toast.error(message);
        throw error;
      }
    },
    [dispatch],
  );

  const deleteBranch = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteBranchStart());
        await branchService.deleteBranchService(id);
        dispatch(deleteBranchSuccess(id));
        toast.success("Branch deleted successfully");
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Failed to delete branch";
        dispatch(deleteBranchFailure(message));
        toast.error(message);
        throw error;
      }
    },
    [dispatch],
  );

  const memoizedState = useMemo(
    () => ({
      branches: branchState.branches,
      loading: branchState.fetchLoading,
      error: branchState.error,

      singleBranch: branchState.singleBranch,
      singleBranchLoading: branchState.singleBranchLoading,
      createLoading: branchState.createLoading,

      updateLoading: branchState.updateLoading,
      deleteLoading: branchState.deleteLoading,

      selectedBranch: branchState.selectedBranch,
    }),
    [branchState],
  );

  return {
    fetchBranches,
    createBranch,
    getSingleBranch,

    updateBranch,
    deleteBranch,
    ...memoizedState,
  };
};
