import axiosInstance from "./axios";
import { IBranchResponse, ICreateBranchPayload, IGetBranchesQuery } from "@/src/types/branch.types";

const getAllBranches =async (
    params: IGetBranchesQuery,
  ): Promise<IBranchResponse> => {
    const res = await axiosInstance.get<IBranchResponse>("/branches", {
      params,
    });
    return res.data;
  }


const createBranchService = async (payload: ICreateBranchPayload) => {
  const res = await axiosInstance.post("/branches", payload);
  return res.data;
};



export const branchService = {
  getAllBranches,
  createBranchService
};
