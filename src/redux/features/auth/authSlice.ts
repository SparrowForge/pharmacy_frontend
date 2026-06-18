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
      }>,
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
      }>,
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

    /* ---------------- AUTH VERIFY EMAIL REDUCERS ---------------- */
    verifyStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    verifySuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.successMessage = action.payload;
    },

    verifyFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ---------------- AUTH RESEND VERIFY EMAIL REDUCERS ---------------- */
    resendVerificationStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    resendVerificationSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.successMessage = action.payload;
    },

    resendVerificationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ---------------- FORGOT PASSWORD REDUCERS ---------------- */
    forgotPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    forgotPasswordSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.successMessage = action.payload;
    },

    forgotPasswordFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ---------------- VERIFY RESET CODE REDUCERS ---------------- */
    verifyResetCodeStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    verifyResetCodeSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.successMessage = action.payload;
    },

    verifyResetCodeFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /* ---------------- RESET PASSWORD REDUCERS ---------------- */
    resetPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    resetPasswordSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.successMessage = action.payload;
    },

    resetPasswordFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    /*-------------------------Refresh Access Token---------------------- */
    refreshTokenStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    refreshTokenSuccess: (
      state,
      action: PayloadAction<{
        tokens: ITokens;
        message: string;
      }>,
    ) => {
      state.loading = false;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;
      state.error = null;
    },

    refreshTokenFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
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
  /* ---------------- AUTH LOGIN REDUCERS ---------------- */
  loginStart,
  loginSuccess,
  loginFailure,

  /* ---------------- AUTH REGISTER REDUCERS ---------------- */
  registerStart,
  registerSuccess,
  registerFailure,

  /* ---------------- AUTH VERIFY EMAIL REDUCERS ---------------- */
  verifyStart,
  verifySuccess,
  verifyFailure,

  /* ---------------- AUTH RESEND VERIFY EMAIL REDUCERS ---------------- */
  resendVerificationStart,
  resendVerificationSuccess,
  resendVerificationFailure,

  /* ---------------- AUTH FORGOT PASSWORD REDUCERS ---------------- */
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFailure,

  /* ---------------- VERIFY RESET CODE REDUCERS ---------------- */
  verifyResetCodeStart,
  verifyResetCodeSuccess,
  verifyResetCodeFailure,

  /* ---------------- RESET PASSWORD REDUCERS ---------------- */
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,

  /*-------------------------Refresh Access Token---------------------- */
  refreshTokenStart,
  refreshTokenSuccess,
  refreshTokenFailure,

  clearAuthMessage,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
