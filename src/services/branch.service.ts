import axiosInstance from "./axios";
import {
  IBranch,
  IBranchResponse,
  ICreateBranchPayload,
  IGetBranchesQuery,
  IUpdateBranchPayload,
} from "@/src/types/branch.types";

const getAllBranches = async (
  params: IGetBranchesQuery,
): Promise<IBranchResponse> => {
  const res = await axiosInstance.get<IBranchResponse>("/branches", {
    params,
  });
  return res.data;
};

const createBranchService = async (payload: ICreateBranchPayload) => {
  const res = await axiosInstance.post("/branches", payload);
  return res.data;
};

const getSingleBranch = async (id: string): Promise<IBranch> => {
  const res = await axiosInstance.get<IBranch>(`/branches/${id}`);

  return res.data;
};

const updateBranchService = async (
  id: string,
  payload: IUpdateBranchPayload,
): Promise<IBranch> => {
  const res = await axiosInstance.patch(`/branches/${id}`, payload);

  return res.data;
};

const deleteBranchService = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/branches/${id}`);
};

export const branchService = {
  getAllBranches,
  createBranchService,
  getSingleBranch,
  updateBranchService,
  deleteBranchService
};
