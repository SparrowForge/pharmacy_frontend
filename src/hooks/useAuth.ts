import { useCallback, useMemo } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IAuthLoginPayload } from "../types/auth.types";

import {
  loginFailure,
  loginStart,
  loginSuccess,

  /* NEW */
  registerStart,
  registerSuccess,
  registerFailure,
} from "../redux/features/auth/authSlice";

import { authService } from "../services/auth.service";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  /* ---------------- LOGIN (UNCHANGED) ---------------- */

  const loginUser = useCallback(
    async (data: IAuthLoginPayload) => {
      try {
        dispatch(loginStart());

        const response = await authService.loginUserService(data);

        dispatch(
          loginSuccess({
            user: response.user,
            tokens: response.tokens,
            message: response.message,
          }),
        );

        localStorage.setItem("accessToken", response.tokens.accessToken);
        localStorage.setItem("refreshToken", response.tokens.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.user));

        toast.success(response.message);

        return response;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Login failed";

        dispatch(loginFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ---------------- NEW: REGISTER ---------------- */

  const registerUser = useCallback(
    async (data: any) => {
      try {
        dispatch(registerStart());

        const response = await authService.registerUserService(data);

        dispatch(
          registerSuccess({
            user: response.user,
            message: response.message,
            emailDispatched: response.emailDispatched,
          }),
        );

        toast.success(response.message);

        return response;
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Registration failed";

        dispatch(registerFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ---------------- STATE (UNCHANGED) ---------------- */

  const memoizedState = useMemo(
    () => ({
      user: auth.user,
      tokens: auth.tokens,
      loading: auth.loading,
      error: auth.error,
      successMessage: auth.successMessage,
      isAuthenticated: auth.isAuthenticated,
    }),
    [auth],
  );

  return {
    loginUser,
    registerUser, // NEW
    ...memoizedState,
  };
};