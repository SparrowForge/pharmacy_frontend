import axiosInstance from "./axios";

import {
  IGetUsersQuery,
  IUsersResponse,
  ISingleUserResponse,
  IUpdateUserPayload,
} from "@/src/types/user.types";

/* ================= GET ALL ================= */
const getUsers = async (params?: IGetUsersQuery): Promise<IUsersResponse> => {
  const res = await axiosInstance.get("/users", {
    params,
  });

  return res.data.data;
};

/* ================= GET SINGLE ================= */
const getSingleUser = async (id: string): Promise<ISingleUserResponse> => {
  const res = await axiosInstance.get(`/users/${id}`);

  return res.data.data;
};

/* ================= UPDATE ================= */
const updateUser = async (
  id: string,
  payload: IUpdateUserPayload,
): Promise<ISingleUserResponse> => {
  const res = await axiosInstance.patch(`/users/${id}`, payload);

  return res.data.data;
};

/* ================= DELETE ================= */
const deleteUser = async (
  id: string,
): Promise<{ id: string; message: string }> => {
  const res = await axiosInstance.delete(`/users/${id}`);

  return res.data;
};

export const userService = {
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
