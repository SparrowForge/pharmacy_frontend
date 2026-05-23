import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import {
  fetchBranchesStart,
  fetchBranchesSuccess,
  fetchBranchesFailure,
} from "@/src/redux/features/branch/branchSlice";
import { branchService } from "../services/branch.service";

export const useBranches = () => {
  const dispatch = useAppDispatch();
  const branchState = useAppSelector((state) => state.branch);
  const fetchBranches = useCallback(async () => {
    try {
      dispatch(fetchBranchesStart());
      const res = await branchService.getAllBranches();
      dispatch(fetchBranchesSuccess(res.data));
    } catch (error: any) {
      dispatch(
        fetchBranchesFailure(
          error?.response?.data?.message || "Failed to fetch branches",
        ),
      );
    }
  }, [dispatch]);

  const memoizedState = useMemo(
    () => ({
      branches: branchState.branches,
      loading: branchState.loading,
      error: branchState.error,
    }),
    [branchState],
  );

  return {
    fetchBranches,
    ...memoizedState,
  };
};
