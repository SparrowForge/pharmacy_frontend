import { ITokens } from "@/src/types/auth.types";
import { ILoginUser } from "@/src/types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ---------------- AUTH LOGIN STATE ---------------- */

interface IAuthState {
  user: ILoginUser | null;
  tokens: ITokens | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  isAuthenticated: boolean;
}

/* ---------------- AUTH REGISTER PAYLOAD TYPE ---------------- */

interface IRegisterUser {
  id: string;
  shopId: string;
  branchId: string;
  role: string;
  fullName: string;
  email: string;
  phone: string;
  status: boolean;
  isVerified: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

/* ---------------- AUTH INITIAL STATE ---------------- */

const initialState: IAuthState = {
  user: null,
  tokens: null,
  loading: false,
  error: null,
  successMessage: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    /* ---------------- AUTH LOGIN REDUCERS  ---------------- */

    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    loginSuccess: (
      state,
      action: PayloadAction<{
        user: ILoginUser;
        tokens: ITokens;
        message: string;
      }>
    ) => {
      state.loading = false;

      state.user = action.payload.user;
      state.tokens = action.payload.tokens;

      state.successMessage = action.payload.message;

      state.isAuthenticated = true;
      state.error = null;
    },

    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
      state.isAuthenticated = false;
    },

    /* ---------------- AUTH REGISTER REDUCERS ---------------- */

    registerStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    registerSuccess: (
      state,
      action: PayloadAction<{
        user: IRegisterUser;
        message: string;
        emailDispatched: boolean;
      }>
    ) => {
      state.loading = false;
      state.user = action.payload.user as any; // safe reuse
      state.successMessage = action.payload.message;
      state.isAuthenticated = false; // user still not logged in (verification needed)
      state.error = null;
    },

    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },

    /* ---------------- AUTH LOGIN REDUCERS ---------------- */

    clearAuthMessage: (state) => {
      state.error = null;
      state.successMessage = null;
    },

    logout: (state) => {
      state.user = null;
      state.tokens = null;
      state.loading = false;
      state.error = null;
      state.successMessage = null;
      state.isAuthenticated = false;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,

  /* ---------------- AUTH REGISTER REDUCERS ---------------- */
  registerStart,
  registerSuccess,
  registerFailure,

  clearAuthMessage,
  logout,
} = authSlice.actions;

export default authSlice.reducer;