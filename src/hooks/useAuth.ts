import { useCallback, useMemo } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { IAuthLoginPayload, IResendVerificationEmailPayload, IVerifyEmailPayload } from "../types/auth.types";

import {
  loginFailure,
  loginStart,
  loginSuccess,

  /* NEW */
  registerStart,
  registerSuccess,
  registerFailure,
  verifyStart,
  verifySuccess,
  verifyFailure,
  resendVerificationStart,
  resendVerificationSuccess,
  resendVerificationFailure,
} from "../redux/features/auth/authSlice";

import { authService } from "../services/auth.service";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  /* ---------------- LOGIN  ---------------- */
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
        const message = error?.response?.data?.message || "Login failed";

        dispatch(loginFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ----------------  REGISTER ---------------- */
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
        const message = error?.response?.data?.message || "Registration failed";

        dispatch(registerFailure(message));

        toast.error(message);

        throw error;
      }
    },
    [dispatch],
  );

  /* ---------------- VERIFY EMAIL ---------------- */
  const verifyEmailUser = useCallback(
    async (data: IVerifyEmailPayload) => {
      try {
        dispatch(verifyStart());
        const response = await authService.verifyEmailService(data);
        dispatch(verifySuccess(response.message));
        toast.success(response.message);
        return response;
      } catch (error: any) {
        const message = error?.response?.data?.message || "Verification failed";
        dispatch(verifyFailure(message));
        toast.error(message);
        throw error;
      }
    },
    [dispatch],
  );

  /* ---------------- RESEND VERIFY EMAIL ---------------- */
  const resendVerificationEmailUser = useCallback(
  async (
    data: IResendVerificationEmailPayload
  ) => {
    try {
      dispatch(resendVerificationStart());
      const response = await authService.resendVerificationEmailService(data);
      dispatch(
        resendVerificationSuccess(
          response.message
        )
      );
      toast.success(response.message);
      return response;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Failed to resend verification email";
      dispatch(
        resendVerificationFailure(message)
      );
      toast.error(message);
      throw error;
    }
  },
  [dispatch],
);

  /* ---------------- STATE  ---------------- */
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
    registerUser,
    verifyEmailUser,
    resendVerificationEmailUser,
    ...memoizedState,
  };
};
