import axiosInstance from "./axios";
import { IBranchResponse } from "@/src/types/branch.types";

const getAllBranches = async (): Promise<IBranchResponse> => {
  const res = await axiosInstance.get<IBranchResponse>(
    "/branches"
  );

  return res.data;
};


export const branchService = {
  getAllBranches,
};
