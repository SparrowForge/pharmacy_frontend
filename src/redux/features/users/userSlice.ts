import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "@/src/types/user.types";

interface IUserState {
  users: IUser[];

  singleUser: IUser | null;

  loading: boolean;
  singleLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  error: string | null;

  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const initialState: IUserState = {
  users: [],
  singleUser: null,

  loading: false,
  singleLoading: false,
  updateLoading: false,
  deleteLoading: false,

  error: null,

  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    /* ================= FETCH USERS ================= */

    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchUsersSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.users = action.payload.items;

      state.page = action.payload.meta.page;
      state.limit = action.payload.meta.limit;
      state.total = action.payload.meta.total;
      state.totalPages = action.payload.meta.totalPages;
    },

    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ================= SINGLE USER ================= */

    fetchSingleUserStart: (state) => {
      state.singleLoading = true;
    },

    fetchSingleUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.singleLoading = false;
      state.singleUser = action.payload;
    },

    fetchSingleUserFailure: (state, action: PayloadAction<string>) => {
      state.singleLoading = false;
      state.error = action.payload;
    },

    /* ================= UPDATE USER ================= */

    updateUserStart: (state) => {
      state.updateLoading = true;
    },

    updateUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.updateLoading = false;

      state.users = state.users.map((u) =>
        u.id === action.payload.id ? action.payload : u,
      );
    },

    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.updateLoading = false;
      state.error = action.payload;
    },

    /* ================= DELETE USER ================= */

    deleteUserStart: (state) => {
      state.deleteLoading = true;
    },

    deleteUserSuccess: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;

      state.users = state.users.filter((u) => u.id !== action.payload);
    },

    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
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
} = userSlice.actions;

export default userSlice.reducer;
