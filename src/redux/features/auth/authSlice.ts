import { ITokens } from "@/src/types/auth.types";
import { ILoginUser } from "@/src/types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IAuthState {
  user: ILoginUser | null;
  tokens: ITokens | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  isAuthenticated: boolean;
}

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

    loginFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
      state.isAuthenticated = false;
    },

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
  clearAuthMessage,
  logout,
} = authSlice.actions;

export default authSlice.reducer;