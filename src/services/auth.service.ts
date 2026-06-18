import {
  IAuthLoginPayload,
  IAuthLoginResponse,
  IForgotPasswordPayload,
  IForgotPasswordResponse,
  IRefreshTokenPayload,
  IRefreshTokenResponse,
  IRegisterPayload,
  IRegisterResponse,
  IResendVerificationEmailPayload,
  IResendVerificationEmailResponse,
  IResetPasswordPayload,
  IResetPasswordResponse,
  IVerifyEmailPayload,
  IVerifyEmailResponse,
  IVerifyResetCodePayload,
  IVerifyResetCodeResponse,
} from "../types/auth.types";
import axiosInstance from "./axios";

const loginUserService = async (
  data: IAuthLoginPayload,
): Promise<IAuthLoginResponse> => {
  const response = await axiosInstance.post<IAuthLoginResponse>(
    "/auth/login",
    data,
  );

  return response.data;
};

const registerUserService = async (
  data: IRegisterPayload,
): Promise<IRegisterResponse> => {
  const res = await axiosInstance.post<IRegisterResponse>(
    "/auth/register",
    data,
  );

  return res.data;
};

const verifyEmailService = async (
  data: IVerifyEmailPayload,
): Promise<IVerifyEmailResponse> => {
  const res = await axiosInstance.post<IVerifyEmailResponse>(
    "/auth/verify-email",
    data,
  );

  return res.data;
};

const resendVerificationEmailService = async (
  data: IResendVerificationEmailPayload,
): Promise<IResendVerificationEmailResponse> => {
  const res = await axiosInstance.post<IResendVerificationEmailResponse>(
    "/auth/resend-verification-email",
    data,
  );

  return res.data;
};

const forgotPasswordService = async (
  data: IForgotPasswordPayload,
): Promise<IForgotPasswordResponse> => {
  const res = await axiosInstance.post<IForgotPasswordResponse>(
    "/auth/forgot-password",
    data,
  );

  return res.data;
};

const verifyResetCodeService = async (
  data: IVerifyResetCodePayload,
): Promise<IVerifyResetCodeResponse> => {
  const res = await axiosInstance.post<IVerifyResetCodeResponse>(
    "/auth/verify-reset-code",
    data,
  );

  return res.data;
};

const resetPasswordService = async (
  data: IResetPasswordPayload,
): Promise<IResetPasswordResponse> => {
  const res = await axiosInstance.post<IResetPasswordResponse>(
    "/auth/reset-password",
    data,
  );

  return res.data;
};

const refreshAccessTokenService = async (
  data: IRefreshTokenPayload,
): Promise<IRefreshTokenResponse> => {
  const res = await axiosInstance.post<IRefreshTokenResponse>(
    "/auth/refresh",
    data,
  );

  return res.data;
};

export const authService = {
  loginUserService,
  registerUserService,
  verifyEmailService,
  forgotPasswordService,
  verifyResetCodeService,
  resetPasswordService,
  resendVerificationEmailService,
  refreshAccessTokenService
};
