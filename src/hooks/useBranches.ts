import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import {
  fetchBranchesStart,
  fetchBranchesSuccess,
  fetchBranchesFailure,
  createBranchStart,
  createBranchSuccess,
  createBranchFailure,
} from "@/src/redux/features/branch/branchSlice";
import { branchService } from "../services/branch.service";
import { ICreateBranchPayload } from "../types/branch.types";
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

  const memoizedState = useMemo(
    () => ({
      branches: branchState.branches,
      loading: branchState.fetchLoading,
      error: branchState.error,
    }),
    [branchState],
  );

  return {
    fetchBranches,
    createBranch,

    ...memoizedState,
  };
};
