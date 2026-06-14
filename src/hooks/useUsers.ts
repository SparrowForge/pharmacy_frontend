import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";

import { userService } from "@/src/services/user.service";

import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchSingleUserStart,
  fetchSingleUserSuccess,
  fetchSingleUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "@/src/redux/features/users/userSlice";

import { IUpdateUserPayload, IGetUsersQuery } from "@/src/types/user.types";

export const useUsers = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector((s) => s.users);

  /* ================= FETCH USERS ================= */
  const fetchUsers = useCallback(
    async (params?: IGetUsersQuery) => {
      try {
        dispatch(fetchUsersStart());

        const res = await userService.getUsers(params);

        dispatch(fetchUsersSuccess(res));
      } catch (err: any) {
        dispatch(
          fetchUsersFailure(
            err?.response?.data?.message || "Failed to fetch users",
          ),
        );
      }
    },
    [dispatch],
  );

  /* ================= SINGLE ================= */
  const fetchSingleUser = useCallback(
    async (id: string) => {
      try {
        dispatch(fetchSingleUserStart());

        const res = await userService.getSingleUser(id);

        dispatch(fetchSingleUserSuccess(res));
      } catch (err: any) {
        dispatch(
          fetchSingleUserFailure(
            err?.response?.data?.message || "Failed to fetch user",
          ),
        );
      }
    },
    [dispatch],
  );

  /* ================= UPDATE ================= */
  const updateUser = useCallback(
    async (id: string, payload: IUpdateUserPayload) => {
      try {
        dispatch(updateUserStart());

        const res = await userService.updateUser(id, payload);

        dispatch(updateUserSuccess(res));
      } catch (err: any) {
        dispatch(
          updateUserFailure(
            err?.response?.data?.message || "Failed to update user",
          ),
        );
      }
    },
    [dispatch],
  );

  /* ================= DELETE ================= */
  const deleteUser = useCallback(
    async (id: string) => {
      try {
        dispatch(deleteUserStart());

        await userService.deleteUser(id);

        dispatch(deleteUserSuccess(id));
      } catch (err: any) {
        dispatch(
          deleteUserFailure(
            err?.response?.data?.message || "Failed to delete user",
          ),
        );
      }
    },
    [dispatch],
  );

  return {
    ...state,

    fetchUsers,
    fetchSingleUser,
    updateUser,
    deleteUser,
  };
};
